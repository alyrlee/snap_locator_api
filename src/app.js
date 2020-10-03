require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const storesRouter = require('./snapLocations/store-locations-router');

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
    res.header("Access-Control-Allow-Origin","*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.get('localhost:3000/find', (req, res) => {
//     res.send('connected!')
// });

app.get('/', (req, res) => {
        //headers: {"Access-Control-Origin: "*"" }
        //${`process.env.GOOGLE_MAPS_API_KEY`}
    axios.get(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU&libraries=places`, `https://maps.googleapis.com/maps-api-v3/api/js/42/4/places_impl.js`)
        then(response => {
            res.send(response.data.results);
        }).catch(error => {
            res.send(error.message);
        })
    });  
    
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/stores', storesRouter);   

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

module.exports = app;