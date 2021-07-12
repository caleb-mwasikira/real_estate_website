const router = require('express').Router();

const UserController = require('../controllers/UserController');
const { isAuthenticated, isAuthorised } = require('../lib/jwtAuthMiddleware');

/**
 * To be able to get all users stored in the database:
 * 1. You must be logged in; isAuthenticated 
 * 2. You must be authorised to view the resource; isAuthorised 
 * 
 * If both requirements are truthy then UserController.getAllUsers gets called
 * else the middlewares end with a failed status.
 * 
 */
router.get('/', 
    isAuthenticated, isAuthorised, 
    UserController.getAllUsers, 
    (req, res, next) => {
    res.status(200).json(req.result);
    return;
});

router.get('/user', UserController.getUser, (req, res, next) => {
    res.status(200).send(req.result);
    return;
});

router.post('/user', UserController.updateUser, (req, res, next) => {
    res.status(200).send(req.result);
    return;
});

router.delete('/user', UserController.deleteUser, (req, res, next) => {
    res.status(200).send(req.result);
    return;
});


module.exports = router;
