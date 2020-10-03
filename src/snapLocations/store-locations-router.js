const express = require('express')
const storeLocationsService = require('./store-locations-service')
const userName = 'DemoUser2020'
const password = 'DemoUserSnap1234!'

fetch(`${API_ENDPOINT}/stores`, {
  method: 'POST',
  headers: {
    Authorization: `Schema ${userName}:${password}`
  },
  body: JSON.stringify({
    ObjectId: 1,
    Store_Name: "Walmart Super Center"
  })
})


.post(jsonBodyParser, (req, res, next) => {
    const { ObjectId, Store_Name } = req.body
    const newStore = { ObjectId, Store_Name }

    for (const [key, value] of Object.entries(newStore)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }
    }

    storeLocationsService.insertStoreLocation(
      req.app.get('db'),
      newStore
    )
    /* some code not shown */
  })