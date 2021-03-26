const Apartment = require("../models/ApartmentModel");


exports.getAllApartments = (req, res, next) => {
    Apartment.find( {}, (error, apartments) => {
        if(error) next(error);
        req.data = apartments;
        next();
    });
}