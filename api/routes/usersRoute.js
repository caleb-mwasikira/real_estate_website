const router = require('express').Router();

const UserController = require('../controllers/UserController');
const jwtAuthMiddleware = require('../lib/jwtAuthMiddleware');

/**
 * To be able to get all users stored in the database:
 * 1. You must be logged in; jwtAuthMiddleware.isAuth 
 * 2. You must be an Admin; jwtAuthMiddleware.isAdmin 
 * 
 * If both requirements are truthy then UserController.getAllUsers gets called
 * else the middlewares end with a failed status.
 * 
 */
router.get('/', 
    jwtAuthMiddleware.isAuth, jwtAuthMiddleware.isAdmin, UserController.getAllUsers, 
    (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: req.data
    });
    return;
});


module.exports = router;
