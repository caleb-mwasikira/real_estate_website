const ObjectId = require('mongoose').Types.ObjectId;


function buildSearchQuery(req) {
    if('_id' in req.query) {
        const id = req.query['_id'];
        req.query['_id'] = new ObjectId(id);
    }
    return req.query;
}

function sendServerError(res, error) {
    res.status(500).json({
        status: "error",
        message: error.message,
        error: error
    });
    return;
}

module.exports = {
    buildSearchQuery, sendServerError
}