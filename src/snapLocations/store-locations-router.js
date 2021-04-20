const express = require("express");
const xss = require("xss");
const path = require("path");
const storeLocationsService = require("./store-locations-service");

const storeLocationsRouter = express.Router();
const jsonParser = express.json();

const serializeSnapLocationsList = (Store_Name) => ({
  ObjectId: Store_Name.ObjectId,
  store_name: xss(Store_Name.Store_Name),
  address: xss(Store_Name.address),
  city: xss(Store_Name.city),
  state: xss(Store_Name.state),
  zip5: Store_Name.zip5,
  latitude: Store_Name.latitude,
  longitude: Store_Name.longitude,
});

storeLocationsRouter
  .route("stores/cityState")
  .get(jsonParser, (req, res, next) => {
    const { city, state } = req.body;
    const knexInstance = req.app.get("db");
    storeLocationsService
      .getSnapCityState(knexInstance, city, state)
      .then((city, state) => {
        res.json({ city, state });
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { city, state } = req.body;
    const knexInstance = req.app.get("db");
    storeLocationsService
      .getSnapCityState(knexInstance, city, state)
      .then((city, state) => {(
          city,
          state
        );
        res.json({ city, state });
        res.json(city && state.map(serializeSnapLocationsList));
      })
      .catch(next);
  });

module.exports = storeLocationsRouter;