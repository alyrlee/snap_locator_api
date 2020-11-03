const express = require('express');
const xss = require('xss');
const jsonParser = express.json();
const path = require('path');
const storeLocationsService = require('./store-locations-service');
const {requireAuth} = require('../utils/jwt-auth');

const storeLocationsRouter = express.Router();

const serializeSnapLocationsList = Store_Name => ({
  ObjectId:Store_Name.ObjectId,
  store_name: xss(Store_Name.Store_Name),
  address: xss(Store_Name.address),
  city: xss(Store_Name.city),
  zip5: Store_Name.zip5
})

storeLocationsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    storeLocationsService.getSnapLocations(knexInstance)
      .then(Store_Name => {
        res.json(Store_Name.map(serializeSnapLocationsList))
    })
        .catch(next)
})
.post(jsonParser, (req, res, next) => {
  const { Store_Name } = req.body
  const newSnapLocation = { Store_Name }

  for (const [key, value] of Object.entries(newSnapLocation)) {
    if (value == null) {
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      })
    }

storeLocationsService.insertSnapLocations(
  req.app.get('db'),
      newSnapLocation
    )
        .then(Store_Name => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${Store_Name.ObjectId}`))
            .json(serializeSnapLocationsList(Store_Name))
      })
      .catch(next)
  }

storesLocationsRouter
  .route('/stores')
  .all(requireAuth)
  .all((req, res, next) => {
    storeLocationsService.getStoreName(
      req.app.get('db'),
      req.params.Store_Name.Store_Name,
      req.user.id
    )
      .then(Store_Name => {
        if (!Store_Name) {
          return res.status(404).json({
            error: { message: `Store location doesn't exist` }
          })
        }
        res.Store_Name = Store_Name
        next()
      })
      .catch(next)
  })
  
  .get((req, res, next) => {
    res.json(serializeSnapLocationsList(res.Store_Name))
  })
    
  .delete((req, res, next) => {
    storeLocationsService.deleteStore_Name(
      req.app.get('db'),
      req.params.store_name.ObjectId
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { Store_Name } = req.body
    const new_snapLocationToUpdate = { Store_Name }

    const numberOfValues = Object.values(new_snapLocationToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'SNAP store name'`
        }
      })

    storeLocationsService.updateStore_Name(
      req.app.get('db'),
      req.params.Store_Name.Store_Name,
      store_nameToUpdate
    )
      .then(updateStore_Name => {
        res.status(204).json(serializeSnapLocationsList(updateStore_Name[0]))
      })
      .catch(next)
  })
})


module.exports = storeLocationsRouter;