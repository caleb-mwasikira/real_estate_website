const User = require("../models/UserModel");
const { genPassword, validPassword } = require("../lib/passwordUtils");
const { buildSearchQuery, sendServerError } = require('./BaseController');


function getAllUsers(req, res, next) {
    User.find({}, (error, users) => {
        if(error) sendServerError(res, error);

        req.data = users;
        next();
    });
}

function getUser(req, res, next) {
    const searchQuery = buildSearchQuery(req);
    const key = Object.keys(searchQuery).shift();

    User.findOne(searchQuery, (error, dbUser) => {
        if(error) sendServerError(res, error);

        if(!dbUser) {
            res.status(400).send({
                status: "fail",
                data: {
                    message: `User With ${key} ${searchQuery[key]} Does Not Exist`
                }
            });
            return;
        } else {
            req.data = dbUser;
            next();
        }
    });
}

function signupUser(req, res, next) {
    const { hash, salt } = genPassword(req.body.password);

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
            .then((dbUser) => {
                req.data = dbUser;
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
    });
}

function updateUser(req, res, next) {
    const searchQuery = buildSearchQuery(req);
    const key = Object.keys(searchQuery).shift();

    User.findOneAndUpdate(searchQuery, req.body,
    {
        new: true,
        upsert: true,
        rawResult: true,
        useFindAndModify: false
    }, 
    (error, dbUser) => {
        if(error) sendServerError(res, error);

        if(!dbUser) {
            res.status(400).send({
                status: "fail",
                data: {
                    message: `User With ${key} ${searchQuery[key]} Does Not Exist`
                }
            });
            return;
        } else {
            req.data = dbUser;
            next();
        }
    });
}

function deleteUser(req, res, next) {
    const searchQuery = buildSearchQuery(req);
    const key = Object.keys(searchQuery).shift();

    User.deleteOne(searchQuery, (error, dbUser) => {
        if(error) sendServerError(res, error);

        if(dbUser.n === 0) {
            res.status(400).send({
                status: "fail",
                data: {
                    message: `User With ${key} ${searchQuery[key]} Does Not Exist`
                }
            });
            return;
        } else {
            dbUser.message = `Successfully Deleted User With ${key} ${searchQuery[key]}`;
            req.data = dbUser;
            next();
        }
    })
}


module.exports = {
    getAllUsers, getUser, signupUser, loginUser, updateUser, deleteUser
}
