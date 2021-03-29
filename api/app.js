const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

/**
 * ------------ GENERAL SETUP -------------
 */
require('dotenv').config({ path: path.resolve(__dirname, './config.env') });
const app = express();


// Middleware that allows Express to parse through both JSON and x-www-form-urlencoded request bodies
// Same as body-parser
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(cors()) // disable during production bcoz of security issues
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views')
app.set('view engine', 'pug');


/**
 * ------------- DATABASE ----------------
 * 
 *  Connect to MongoDB Server using the connection string in the `.env` file.  
 *  
 *  MONGO_URI=mongodb://<user>:<password>@localhost:27017/database_name
 */
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to MongoDB");
})
.catch((error) => {
    console.log("An error occurred while connecting to MongoBD database");
});


/**
 * -------------- ROUTES ----------------
 */
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const apartmentsRouter = require('./routes/apartmentsRoute');

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/apartments', apartmentsRouter);


/**
 * -------------- HANDLE PAGE ERRORS --------------
 */
const createError = require('http-errors');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app
