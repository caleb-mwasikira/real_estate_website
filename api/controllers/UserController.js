const User = require("../models/UserModel");
const { genPassword, validPassword } = require("../lib/passwordUtils");


function sendServerError(res, error) {
    res.status(500).json({
        status: "error",
        message: error.message,
        error: error
    });
    return;
}


function signupUser(req, res, next) {
    const { salt, hash } = genPassword(req.body.password);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: {
            hash: hash,
            salt: salt
        },
        admin: false
    });

    newUser.save()
        .then((user) => {
            req.data = user;
            next();
        })
        .catch((error) => sendServerError(res, error));

}

function loginUser(req, res, next) {

    User.findOne({ email: req.body.email }, (error, dbUser) => {
        if(error) sendServerError(res, error);

        if(!dbUser) {
            res.status(400).send({
                status: "fail",
                data: {
                    message: `User With Account ${req.body.email} Does Not Exist`
                }
            });
            return;
        }

        if(validPassword(req.body.password, dbUser.password.hash, dbUser.password.salt)) {
            req.data = dbUser;
            next();

        } else {
            res.status(400).send({
                status: "fail",
                data: {
                    message: `Invalid Password For ${req.body.email}`
                }
            });
            return;
        }
    })
}

function getAllUsers(req, res, next) {
    User.find({}, (error, users) => {
        if(error) sendServerError(res, error);

        req.data = users;
        next();
    });
}


module.exports = {
    signupUser, loginUser, getAllUsers
}
