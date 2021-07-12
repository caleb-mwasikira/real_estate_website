const ObjectId = require('mongoose').Types.ObjectId;

function sendServerError(res, error) {
    res.status(500).json({
        status: false,
        message: error.message,
        error: error
    });
    return;
}

module.exports = {
    sendServerError
}