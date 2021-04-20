require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const storesRouter = require('./snapLocations/store-locations-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/api', (req, res) => {
    res.send('Hello, welcome to SNAP Locator API')
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*","https://snap-locator-client.vercel.app","https://murmuring-shore-59851.herokuapp.com", "https://murmuring-shore-59851.herokuapp.com/api/stores/cityState" ); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 
app.use('/api/stores', storesRouter); 

app.use(function errorHandler(error, req, res, next) {
    let response
    console.error(error);
    if (NODE_ENV === 'production') {
        response = { error: {message: 'server error.'}};
    } else {
        response = {message: error.message, error};
    }
    res.status(500).json(response);
});

module.exports = app;