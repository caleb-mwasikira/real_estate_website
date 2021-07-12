const router = require('express').Router();

const UserController = require('../controllers/UserController');
const jwtAuthMiddleware = require('../lib/jwtAuthMiddleware');


router.post('/signup', UserController.getUser, UserController.signupUser, (req, res) => {
    res.status(201).send(req.result);
    return;
});

router.post('/login', UserController.loginUser, (req, res) => {
    const jwtToken = jwtAuthMiddleware.generateAccessToken(req.result);

    res.status(200).send({
        status: true,
        message: `Logged in as ${req.body.email}`,
        data: {
            token: jwtToken
        }
    });
    return;
})

module.exports = router;
