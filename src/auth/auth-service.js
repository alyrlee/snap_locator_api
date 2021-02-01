const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')



// Login Router registrationRoutes.route(RouteNames.login).post(function(req, res) 
// { Registration.findOne({ user_name: req.body.user_name }) 
// .then(user => { console.log("User from login", user) if (!user) res.sendStatus(204); 
// else { bcrypt.compare(req.body.password, user.password) .then(passwordMatch => passwordMatch ? res.sendStatus(200) 
// : res.sendStatus(204)) } }); });

const AuthService = {
  getUserWithUserName(db, user_name) {
    return db('snap_app_users')
      .where({ user_name })
      .first()
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },
  passwordMatch(password, user_name){
    return bcrypt.compare(password, user_name)
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    })
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    })
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':')
  },
}

module.exports = AuthService
