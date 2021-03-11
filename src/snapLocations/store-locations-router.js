const express = require("express");
const xss = require("xss");
const jsonParser = express.json();
const path = require("path");
const storeLocationsService = require("./store-locations-service");

const storeLocationsRouter = express.Router();

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
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    storeLocationsService
      .getSnapLocations(knexInstance)
      .then((Store_Name) => {
        res.json(Store_Name.map(serializeSnapLocationsList));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { Store_Name } = req.body;
    const newSnapLocation = { Store_Name };

    for (const [key, value] of Object.entries(newSnapLocation)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });
      }
    }
  });

storeLocationsRouter
  .route("/cityState")
  .get(jsonParser, (req, res, next) => {
    console.log("request is: ", req);
    const { city, state } = req.body;
    console.log("we received city/state from front end??", city, state);
    const knexInstance = req.app.get("db");
    storeLocationsService
      .getSnapCityState(knexInstance, city, state)
      .then(city, (state) => {
        // this is how you organize your response back to the front end
        console.log(
          "~~~~this is the format will be sending back!\n~~~~",
          city,
          state
        );
        res.json({ city, state });
        // res.json(city && state.map(serializeSnapLocationsList))
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    console.log("request is: ", req);
    const { city, state } = req.body;
    console.log("we received city/state from front end??", city, state);
    const knexInstance = req.app.get("db");
    storeLocationsService
      .getSnapCityState(knexInstance, city, state)
      .then(city, (state) => {
        // this is how you organize your response back to the front end
        console.log(
          "~~~~this is the format will be sending back!\n~~~~",
          city,
          state
        );
        res.json({ city, state });
        // res.json(city && state.map(serializeSnapLocationsList))
      })
      .catch(next);
    // const newSnapLocation = { city, state };

    // for (const [key, value] of Object.entries(newSnapLocation)) {
    //   if (value == null) {
    //     return res.status(400).json({
    //       error: `Missing '${key}' in request body`,
    //     });
    //   }
    // }
  });
      

  // storeLocationsService
  //   .insertSnapLocations(req.app.get("db"), newSnapLocation)
  //   .then((Store_Name) => {
  //     res
  //       .status(201)
  //       .location(
  //         path.posix.join(req.originalUrl, `/${Store_Name.ObjectId}`)
  //       )
  //       .json(serializeSnapLocationsList(Store_Name));
  //   })
  //   .catch(next);

  //   storeLocationsRouter
  //     .route("/stores")
  //     // .all(requireAuth) //need to reimplement to make it a protected route, optional
  //     .all((req, res, next) => {
  //       storeLocationsService
  //         .getStoreName(
  //           req.app.get("db"),
  //           req.params.Store_Name.Store_Name,
  //           req.user.id
  //         )
  //         .then((Store_Name) => {
  //           if (!Store_Name) {
  //             return res.status(404).json({
  //               error: { message: `Store location doesn't exist` },
  //             });
  //           }
  //           res.Store_Name = Store_Name;
  //           next();
  //         })
  //         .catch(next);
  //     })

  //     .get((req, res, next) => {
  //       res.json(serializeSnapLocationsList(res.Store_Name));
  //     })

  //     .delete((req, res, next) => {
  //       storeLocationsService
  //         .deleteStore_Name(req.app.get("db"), req.params.store_name.ObjectId)
  //         .then((numRowsAffected) => {
  //           res.status(204).end();
  //         })
  //         .catch(next);
  //     })
  //     .patch(jsonParser, (req, res, next) => {
  //       const { Store_Name } = req.body;
  //       const new_snapLocationToUpdate = { Store_Name };

  //       const numberOfValues = Object.values(new_snapLocationToUpdate).filter(
  //         Boolean
  //       ).length;
  //       if (numberOfValues === 0)
  //         return res.status(400).json({
  //           error: {
  //             message: `Request body must content either 'SNAP store name'`,
  //           },
  //         });
  //   });

  //   storeLocationsService
  //     .updateStore_Name(
  //       req.app.get("db"),
  //       req.params.Store_Name.Store_Name,
  //       store_nameToUpdate
  //     )
  //     .then((updateStore_Name) => {
  //       res
  //         .status(204)
  //         .json(serializeSnapLocationsList(updateStore_Name[0]));
  //     })
  //     .catch(next);


module.exports = storeLocationsRouter;
