const router = require('express').Router();
const UserController = require("../controllers/UserController");
const jwtAuthMiddleware = require('../lib/jwtAuthMiddleware');


router.post('/signup', UserController.signupUser, (req, res) => {
    res.status(201).send({
        status: "success",
        message: `Created A New Account For ${req.data.username}`
    });
    return;
});

router.post('/login', UserController.loginUser, (req, res) => {
    const jwtToken = jwtAuthMiddleware.generateAccessToken(req.data);

    res.status(200).send({
        status: "success",
        data: {
            message: `Successfully Logged In As ${req.body.email}`,
            token: jwtToken
        }
    });
    return;
})

module.exports = router;
