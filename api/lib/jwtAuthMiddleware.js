const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const path = require('path');
const url = require('url');
const { sendServerError } = require('../controllers/BaseController');
const Authorisation = require('../models/AuthorisationModel');

dotenv.config({ path: path.resolve(__dirname, '../config.env') });


function generateAccessToken(user) {
    return jwt.sign( { user }, process.env.SECRET_TOKEN, { expiresIn: '1d' });
}

/**
 * 
 * Checks if a user is logged in or not. A user is considered to be logged in if:
 * 1. They have a json web token in their request Headers e.g Bearer <TOKEN>
 * 2. and the JWT gets successfully verified against the SECRET_TOKEN
 * 
 * Note:- The named TOKEN is acquired when you successfully login; in your response data
 * 
 * If a users JWT is OK, the web token gets deserialized and placed in the request object
 * else the endpoint responds with an error status
 * 
 */
function isAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if(token == null) {
        res.status(401).json({
            status: false,
            data: {
                message: "Unauthorized Page Access. Please Login To Continue"
            }
        });
        return;
    }
  
    jwt.verify(token, process.env.SECRET_TOKEN, (error, verifiedJwt) => {
        if(error) {
            res.status(500).json({
                status: false,
                message: error.message,
                error: error
            });
            return;
        }else {
            req.jwtToken = verifiedJwt;
            next();
        }
    })
}

/**
 * 
 * The middleware below checks whether a user is allowed to view a certain resource or not
 * based on the users role. 
 * e.g. User John Doe of group 'User' may try to view resources from group 'Marketing' 
 * or even 'Admin'...this middleware here checks (the database) if they are allowed to do so.
 * Use this middleware to restrict access to protected routes.
 * 
 */
function isAuthorised(req, res, next) {
    const user = req.jwtToken.user;
    const userAuthorisation = user.role;
    
    // load authorisations from the database see what the user is allowed to do
    Authorisation.findOne({ role: userAuthorisation }, (error, dbAuthorisations) => {
        if(error) sendServerError(res, error);

        if(!dbAuthorisations) {
            res.status(400).json({
                status: false,
                data: {
                    message: `No Active Access Control Set For Group:${userAuthorisation}`
                }
            });
            return;
        }

        const currentURL = `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`;
        const authorisedURLs = dbAuthorisations.permissions;

        if(authorisedURLs.includes(currentURL)) {
            next();
        }else {
            res.status(401).json({
                status: false,
                data: {
                    message: `You Are Not Authorised To View This Resource. Please Contact Your Admin To Increase Your Clearance`
                }
            });
            return;
        }
    });
}

module.exports = {
    generateAccessToken, isAuthenticated, isAuthorised
}