const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const path = require('path');

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
function isAuth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if(token == null) {
        res.status(401).json({
            status: "fail",
            data: {
                message: "Unauthorized Page Access. Please Login To Continue"
            }
        });
        return;
    }
  
    jwt.verify(token, process.env.SECRET_TOKEN, (error, verifiedJwt) => {
        if(error) {
            res.status(500).json({
                status: "error",
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
 * After successfull authentication; isAdmin gets the deserialized web token
 * and checks if the user is an Admin.
 * If they are an Admin, the next middleware is called
 * else the endpoint responds with a fail status
 * Use this to restrict access to sensitive/protected URLs
 * 
 */
function isAdmin(req, res, next) {
    const user = req.jwtToken.user;

    if(user && user.admin) {
        next();

    }else {
        res.status(403).json({
            status: "fail",
            data: {
                message: "You Are Restricted From Viewing This Resource Because You Are Not Admin"
            }
        });
        return;
    }
}

module.exports = {
    generateAccessToken, isAuth, isAdmin
}