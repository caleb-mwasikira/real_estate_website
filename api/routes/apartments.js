const express = require('express');
const router = express.Router();

const apartmentController = require("../controllers/ApartmentController");


router.get('/', apartmentController.getAllApartments, (req, res, next) => {
  res.send(req.data);
});


module.exports = router;
