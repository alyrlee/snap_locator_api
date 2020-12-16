const express = require('express');
const jsonParser = express.json();
const path = require('path');

profileRouter = express.Router()

profileRouter
.route('/')
  .get((req, res, next) => {
    ProfileService.getAllUserProfiles(req.app.get('db'))
      .then(articles => {
        res.json(articles.map(ProfileService.serializeUserProfile))
      })
      .catch(next)
  })

profileRouter
  .route('/:article_id')
  .all(checkProfileExists)
  .get((req, res) => {
    res.json(ArticlesService.serializeUserProfile(res.profile))
  })

profileRouter.route('/:user_id/')
  .all(checkProfileExists)
  .get((req, res, next) => {
    ProfileService.getUserProfile(
      req.app.get('db'),
      req.params.user_id
    )
      .then(profile => {
        res.json(profile.map(ProfileService.serializeUserProfile))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkProfileExists(req, res, next) {
  try {
    const profile = await ProfileService.getById(
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
