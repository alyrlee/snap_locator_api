const express = require('express');
const MapService = require('./map-service');
const app = require('../app');

const mapRouter = express.Router();
const jsonBodyParser = express.json(); 

app.get("/:ObjectId", function (req, res))
{
    
}