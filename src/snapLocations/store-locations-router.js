const express = require('express');
const xss = require('xss');
const jsonParser = express.json();
const path = require('path');
const storeLocationsService = require('./store-locations-service');
const {requireAuth} = require('../middleware/jwt-auth');

const storeLocationsRouter = express.Router();

const userName = 'DemoUser2020'
const password = 'DemoUserSnap1234!'

// fetch(`${API_ENDPOINT}/stores`, {
//   method: 'POST',
//   headers: {
//     Authorization: `Schema ${userName}:${password}`
//   },
//   body: JSON.stringify({
//     ObjectId: 1,
//     Store_Name: "Walmart Super Center"
//   })
// })

const serializeSnapLocationsList = store_name => ({
  ObjectId: store_name.ObjectId,
  store_name: xss(store_name.store_name),
  address: xss(store_name.address),
  city: xss(store_name.city),
  zip5: store_name.zip5
})

storeLocationsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    storeLocationsService.getSnapLocations(knexInstance)
      .then(store_name => {
        res.json(store_name.map(serializeSnapLocationsList))
    })
        .catch(next)
})
.post(jsonParser, (req, res, next) => {
  const { Store_Name } = req.body
  const newSnapLocation = { Store_Name }

  for (const [Store_Name] of Object.entries(newSnapLocation)) {
    if (value == null) {
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      })
    }

storeLocationsService.insertSnapLocations(
  req.app.get('db'),
      newSnapLocation
    )
        .then(store_name => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${store_name.ObjectId}`))
            .json(serializeSnapLocationsList(store_name))
      })
      .catch(next)
  }

storesLocationsRouter
  .route('stores/:store_name_ObjectId')
  .all(requireAuth)
  .all((req, res, next) => {
    storeLocationsService.getByObjectId(
      req.app.get('db'),
      req.params.store_name.ObjectId,
      req.user.id
    )
      .then(store_name => {
        if (!store_name) {
          return res.status(404).json({
            error: { message: `Store location doesn't exist` }
          })
        }
        res.store_name = store_name
        next()
      })
      .catch(next)
  })
  
  .get((req, res, next) => {
    res.json(serializeSnapLocationsList(res.store_name))
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
      req.params.store_name.store_name,
      store_nameToUpdate
    )
      .then(updateStore_Name => {
        res.status(204).json(serializeSnapLocationsList(updateStore_Name[0]))
      })
      .catch(next)
  })
})


module.exports = storeLocationsRouter;