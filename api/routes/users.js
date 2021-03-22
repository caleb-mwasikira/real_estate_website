var express = require('express');
var router = express.Router();


const users = [
  {
    "id": 1,
    "username": "Alice",
  },
  {
    "id": 2,
    "username": "Bob",
  },
  {
    "id": 3,
    "username": "John Doe",
  },
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json(users);
});

module.exports = router;
