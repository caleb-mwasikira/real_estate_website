const express = require('express');
const router = express.Router();

const ApartmentController = require("../controllers/ApartmentController");


router.get('/', 
    ApartmentController.getAllApartments, 
    (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: req.data
    });
    return;
});

router.post('/create-apartment', ApartmentController.createApartment, (req, res, next) => {
  res.status(200).send({
      status: "success",
      data: req.data
  });
  return;
});

router.get('/apartment', ApartmentController.getApartment, (req, res, next) => {
    res.status(200).send({
        status: "success",
        data: req.data
    });
    return;
});

router.post('/apartment', ApartmentController.updateApartment, (req, res, next) => {
    res.status(200).send({
        status: "success",
        data: req.data
    });
    return;
});

router.delete('/apartment', ApartmentController.deleteApartment, (req, res, next) => {
    res.status(200).send({
        status: "success",
        data: req.data
    });
    return;
});


module.exports = router;
