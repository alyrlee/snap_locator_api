const express = require('express');
const jsonParser = express.json();
const path = require('path');
const profileService = require('./profile-locations-services');

profileRouter = express.Router()

profileRouter
.route('/')
  .get((req, res, next) => {
    profileService.getAllUserProfiles(req.app.get('db'))
      .then(user_name => {
        res.json(user_name.map(profileService.serializeUserProfile))
      })
      .catch(next)
  })

profileRouter.route('/:user_id/')
  .all(checkProfileExists)
  .get((req, res, next) => {
    profileService.getAllUserProfiles(
      req.app.get('db'),
      req.params.user_id
    )
      .then(profile => {
        res.json(profile.map(profileService.serializeUserProfile))
      })
      .catch(next)
  })

  // .route('/')
  .get((req, res, next) => {
    profileService.getUserSavedLocations(req.app.get('db'))
      .then(user_saved_locations => {
        res.json(user_saved_locations.map(profileService.serializeUserProfile))
      })
      .catch(next)
  })

async function checkProfileExists(req, res, next) {
  try {
    const profile = await profileService.getAllUserProfiles(
      req.app.get('db'),
      req.params.user_id
    )

    if (!profile)
      return res.status(404).json({
        error: `User Profile doesn't exist`
      })

    res.profile = profile
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = profileRouter