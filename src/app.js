require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
// const storesRouter = require('./snapLocations/store-locations-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, welcome to SNAP Locator API')
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key=AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU", "localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
// app.use('/api/stores', storesRouter);

app.use(function errorHandler(error, req, res, next) {
    let response;

    if (NODE_ENV === 'production') {
        response = { error: {message: 'server error.'}};
    }
    else {
        console.error(error);
        response = {message: error.message, error};
    }
    res.status(500).json(response);
});

app.post('/', function(req, res, next) {
    // Handle the post for this route
   });

module.exports = app;