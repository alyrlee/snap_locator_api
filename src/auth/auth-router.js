const express = require('express');
const AuthService = require('./auth-service');
const bcrypt = require('bcryptjs');

const authRouter = express.Router();
const jsonBodyParser = express.json(); 

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const { user_name, password } = req.body;
        const loginCreds = {user_name, password};
        console.log('user creds', loginCreds);

        for (const [key, value] of Object.entries(loginCreds))
             if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

  AuthService.getUserWithUserName(
          req.app.get('db'),
          loginCreds.user_name
        )
          .then(dbUser => {
            if (!dbUser)
              return res.status(400).json({
                error: 'Incorrect user_name',
              })
    
            console.log('login match', req.body.password, dbUser.password)
            if  (req.body.password === dbUser.password) {
              const sub = dbUser.user_name
              const payload = { user_id: dbUser.id }
              res.send({
                authToken: AuthService.createJwt(sub, payload),
              })

          } else {
            return res.status(400).json({
              error: 'Incorrect password',
            })
          }
          })
          .catch(next)
      })
    
    module.exports = authRouter
          

  