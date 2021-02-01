const express = require('express');
const AuthService = require('./auth-service');
const bcrypt = require('bcryptjs');
const {hashPassword} = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json(); 

// Login Router registrationRoutes.route(RouteNames.login).post(function(req, res) 
// { Registration.findOne({ user_name: req.body.user_name }) 
// .then(user => { console.log("User from login", user) if (!user) res.sendStatus(204); 
// else { bcrypt.compare(req.body.password, user.password) .then(passwordMatch => passwordMatch ? res.sendStatus(200) 
// : res.sendStatus(204)) } }); });

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
        if (!dbUser) res.sendStatus(204); 
        else { bcrypt.compare(req.body.password, dbUser.password) .then(passwordMatch => passwordMatch ? res.sendStatus(200) 
       : res.sendStatus(204)) } 
        // if (!dbUser)
        //   return res.status(400).json({
        //     error: 'Incorrect user_name',
        //   })

const isLoggedIn = AuthService.hashPassword(password)
.then(password => {
  if(!isLoggedIn) 
    return res.status(400).json({
      error: 'Incorrect hash',
    }) 
console.log('db user', dbUser);
console.log('pw', password);

return AuthService.comparePasswords(password,hash)
         .then(password => {
           if (!password === password)
            return res.status(400).json({
               error: 'Incorrect password',
            })       
               
// if string 1 === string 2
const passwordMatch = (password, user_name)
         .then(passwordMatch => {
           if (!passwordMatch)
            return res.status(400).json({
               error: 'Incorrect password match',
            })            
    const sub = dbUser.user_name
    const payload = { user_id: dbUser.id }
        res.send({
              authToken: AuthService.createJwt(sub, payload),
            })
          })
      })
      .catch(next)
  })
 })
})

  
module.exports = authRouter