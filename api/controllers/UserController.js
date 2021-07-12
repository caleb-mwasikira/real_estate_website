const User = require("../models/UserModel");
const { genPassword, validPassword } = require("../lib/passwordUtils");
const { sendServerError } = require('./BaseController');


function getAllUsers(req, res, next) {
    User.find({}, (error, users) => {
        if(error) sendServerError(res, error);

        req.result = {
            status: users ? true : false,
            message: `Found ${users.length} users`,
            data: users
        }
        next();
    });
}

function getUser(req, res, next) {
    User.findOne({ email: req.body.email }, (error, dbUser) => {
        if(error) sendServerError(res, error);

        if(!dbUser) {
            req.result = {
                status: false,
                message: `User with email ${req.body.email} does not exist`,
                data: null,
            }
            next();
        } else {
            req.result = {
                status: true,
                message: `User with email ${req.body.email} found`,
                data: dbUser,
            };
            next();
        }
    });
}

function signupUser(req, res, next) {    
    if(req.result.status) {
        /**
         * If user already exists.
         * 409; The request could not be completed due to a 
         * conflict with the current state of the resource.
         */
        res.status(409).send({
            status: false,
            message: `User with email ${req.body.email} already exists. Cannot create duplicate`,
            data: null,
        });
    } else {
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
                    req.result = {
                        status: true,
                        message: `Created a new account for ${newUser.username}`,
                        data: dbUser,
                    }
                    next();
                })
                .catch((error) => sendServerError(res, error));
    }

    
}

function loginUser(req, res, next) {
    User.findOne({ email: req.body.email }, (error, dbUser) => {
        if(error) sendServerError(res, error);

        if(!dbUser) {
            res.status(400).send({
                status: false,
                message: `User with email ${req.body.email} does not exist`,
                data: null,
            });
            return;
        }

        if(validPassword(req.body.password, dbUser.password.hash, dbUser.password.salt)) {
            req.result = dbUser;
            next();
        } else {
            res.status(400).send({
                status: false,
                message: `Invalid password for account ${req.body.email}`,
                data: null,
            });
            return;
        }
    });
}

function updateUser(req, res, next) {
    User.findOneAndUpdate({ email: req.body.email }, req.body,
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
                status: false,
                message: `User with email ${req.body.email} does not exist`,
                data: null,
            });
            return;
        } else {
            req.result = {
                status: true,
                message: `Updated account ${req.body.email}`,
                data: dbUser,
            };
            next();
        }
    });
}

function deleteUser(req, res, next) {
    User.deleteOne({ email: req.body.email }, (error, dbUser) => {
        if(error) sendServerError(res, error);

        if(dbUser.n === 0) {
            res.status(400).send({
                status: false,
                message: `User with email ${req.body.email} does not exist`,
                data: null,
            });
            return;
        } else {
            req.result = {
                status: true,
                message: `Deleted user with email ${req.body.email}`,
                data: dbUser,
            };
            next();
        }
    })
}


module.exports = {
    getAllUsers, getUser, signupUser, loginUser, updateUser, deleteUser
}
