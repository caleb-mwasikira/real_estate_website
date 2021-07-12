const Apartment = require("../models/ApartmentModel");
const ObjectId = require("mongoose").Types.ObjectId;


function sendServerError(res, error) {
    res.status(500).json({
        status: false,
        message: error.message,
        error: error
    });
    return;
}

function createApartment(req, res, next) {
    if(req.result.status) {
        /**
         * If apartment already exists.
         * 409; The request could not be completed due to a 
         * conflict with the current state of the resource.
         */
        res.status(409).send({
            status: false,
            message: `Apartment name '${req.body.name}' already exists. Cannot create duplicate`,
            data: null,
        });
    } else {
        const newApartment = new Apartment({
            name: req.body.name,
            address: req.body.address,
            img_url: req.body.img_url,
            desc: req.body.desc,
            photos: req.body.photos,
            price: {
                currency_code: req.body.price.currency_code,
                amount: req.body.price.amount
            },
            facilities: req.body.facilities
        });
    
        newApartment.save()
            .then((apartment) => {
                req.result = {
                    success: true,
                    message: `Created new apartment with name ${req.body.name}`,
                    data: apartment,
                }
                next();
            })
            .catch((error) => sendServerError(res, error));
    }
}

function getAllApartments(req, res, next) {
    Apartment.find( {}, (error, apartments) => {
        if(error) sendServerError(res, error);

        req.result = {
            status: apartments ? true : false,
            message: `Found ${apartments.length} apartments`,
            data: apartments
        }
        next();
    });
}

function getApartment(req, res, next) {
    const apartmentId = req.query['_id'] || req.body['_id'];
    const apartmentName = req.body['name'];

    // If apartmentId is undefined identify with apartmentName and vice versa
    let identifier = `${apartmentName ? `name ${apartmentName}` : `_id ${apartmentId}`}`;

    Apartment.findOne({ $or: [{ _id: apartmentId }, { name: apartmentName }]}, (error, apartment) => {
        if(error) sendServerError(res, error);

        if(!apartment) {
            req.result = {
                status: false,
                message: `Apartment with ${identifier} does not exist`,
                data: null,
            }
            next();
        } else {
            req.result = {
                status: true,
                message: `Found apartment with ${identifier}`,
                data: apartment,
            }
            next();
        }
    });
}

function updateApartment(req, res, next) {
    const apartmentId = new ObjectId(req.query['_id']);

    Apartment.findOneAndUpdate({ _id: apartmentId }, req.body,
    {
        new: true,
        upsert: true,
        rawResult: true,
        useFindAndModify: false
    }, 
    (error, apartment) => {
        if(error) sendServerError(res, error);

        if(!apartment) {
            res.status(400).send({
                status: false,
                message: `Apartment with _id ${apartmentId} does not exist`,
                data: null,
            });
            return;
        } else {
            req.result = {
                status: true,
                message: `Updated apartment with _id ${apartmentId}`,
                data: apartment,
            }
            next();
        }
    });
}

function deleteApartment(req, res, next) {
    const apartmentId = new ObjectId(req.query['_id']);

    Apartment.deleteOne({ _id: apartmentId }, (error, apartment) => {
        if(error) sendServerError(res, error);

        if(apartment.n === 0) {
            res.status(400).send({
                status: false,
                message: `Apartment with _id ${apartmentId} does not exist`,
                data: null,
            });
            return;
        } else {
            req.result = {
                status: true,
                message: `Deleted apartment with _id ${apartmentId}`,
                data: apartment,
            }
            next();
        }
    })
}


module.exports = {
    createApartment, getAllApartments, getApartment, updateApartment, deleteApartment
}
