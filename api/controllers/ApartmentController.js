const Apartment = require("../models/ApartmentModel");


function sendServerError(res, error) {
    res.status(500).json({
        status: "error",
        message: error.message,
        error: error
    });
    return;
}

function createApartment(req, res, next) {

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
        .then((Apartment) => {
            req.data = Apartment;
            next();
        })
        .catch((error) => sendServerError(res, error));
}

function getAllApartments(req, res, next) {
    Apartment.find( {}, (error, apartments) => {
        if(error) sendServerError(res, error);

        req.data = apartments;
        next();
    });
}

function buildSearchQuery(req) {

    if('_id' in req.query) {
        const id = req.query['_id'];
        req.query['_id'] = new ObjectId(id);
    }
    return req.query;
}

function getApartment(req, res, next) {
    const searchQuery = buildSearchQuery(req);
    const key = Object.keys(searchQuery).shift();

    Apartment.findOne(searchQuery, (error, dbApartment) => {
        if(error) sendServerError(res, error);

        if(!dbApartment) {
            res.status(400).send({
                status: "fail",
                data: {
                    message: `Apartment With ${key} ${searchQuery[key]} Does Not Exist`
                }
            });
            return;
        } else {
            req.data = dbApartment;
            next();
        }
    });
}

function updateApartment(req, res, next) {
    const searchQuery = buildSearchQuery(req);
    const key = Object.keys(searchQuery).shift();

    Apartment.findOneAndUpdate(searchQuery, req.body,
    {
        new: true,
        upsert: true,
        rawResult: true,
        useFindAndModify: false
    }, 
    (error, dbApartment) => {
        if(error) sendServerError(res, error);

        if(!dbApartment) {
            res.status(400).send({
                status: "fail",
                data: {
                    message: `Apartment With ${key} ${searchQuery[key]} Does Not Exist`
                }
            });
            return;
        } else {
            req.data = dbApartment;
            next();
        }
    });
}

function deleteApartment(req, res, next) {
    const searchQuery = buildSearchQuery(req);
    const key = Object.keys(searchQuery).shift();

    Apartment.deleteOne(searchQuery, (error, dbApartment) => {
        if(error) sendServerError(res, error);

        if(dbApartment.n === 0) {
            res.status(400).send({
                status: "fail",
                data: {
                    message: `Apartment With ${key} ${searchQuery[key]} Does Not Exist`
                }
            });
            return;
        } else {
            dbApartment.message = `Successfully Deleted Apartment With ${key} ${searchQuery[key]}`;
            req.data = dbApartment;
            next();
        }
    })
}


module.exports = {
    createApartment, getAllApartments, getApartment, updateApartment, deleteApartment
}
