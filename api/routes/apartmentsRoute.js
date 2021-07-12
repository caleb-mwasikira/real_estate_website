const express = require('express');
const router = express.Router();

const ApartmentController = require("../controllers/ApartmentController");


router.get('/', 
    ApartmentController.getAllApartments, (req, res, next) => {
    res.status(200).json(req.result);
    return;
});

router.post('/create-apartment', 
    ApartmentController.getApartment, ApartmentController.createApartment, 
    (req, res, next) => {
    res.status(201).send(req.result);
    return;
});

router.get('/apartment', ApartmentController.getApartment, (req, res, next) => {
    res.status(200).send(req.result);
    return;
});

router.post('/apartment', ApartmentController.updateApartment, (req, res, next) => {
    res.status(200).send(req.result);
    return;
});

router.delete('/apartment', ApartmentController.deleteApartment, (req, res, next) => {
    res.status(200).send(req.result);
    return;
});


module.exports = router;
