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
          loginUser.user_name
        )
          .then(dbUser => {
            if (!dbUser)
              return res.status(400).json({
                error: 'Incorrect user_name or password',
              })
    
            return AuthService.comparePasswords(loginUser.password, dbUser.password)
              .then(compareMatch => {
                if (!compareMatch)
                  return res.status(400).json({
                    error: 'Incorrect user_name or password',
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
    
    module.exports = authRouter
          
         
//   AuthService.getUserWithUserName(
//       req.app.get('db'),
//       loginCreds.user_name
//     )  
//     .then(dbUser => {
//       if (!dbUser) res.sendStatus(204); 
//       else { 
//         bcrypt.compare(req.body.password, dbUser.password) 
//         .then(passwordMatch => passwordMatch ? 

//    authRouter.post('/login', requireAuth, (req, res) => {
//         const sub = req.dbUser.user_name
//         const payload = { user_id: req.dbUser.id }  
//         res.send({
//                authToken: AuthService.createJwt(sub, payload),
//        })
//       })
//          res:sendStatus(200)
//       }
 
//       return AuthService.hashPassword(password)
//       .then(hashedPassword => {
//         const newUser = {
//           user_name,
//           password: hashedPassword,
//           full_name,
//           date_created: 'now()',
//         }

//         return AuthService.insertUser(
//           req.app.get('db'),
//           newUser
//         )
//           .then(user => {
//             res
//               .status(201)
//               .location(path.posix.join(req.originalUrl, `/${user.id}`))
//               .json(UsersService.serializeUser(user))
//           })
//       })
//   })
//   .catch(next)
// })



// module.exports = authRouter


//var passwordHash = require('./lib/password-hash'); var hashedPassword = 'sha1$3I7HRwy7$cbfdac6008f9cab4083784cbd1874f76618d2a97'; 
//console.log(passwordHash.verify('password123', hashedPassword)); // true console.log(passwordHash.verify('Password0', hashedPassword)); // false
// const hash = '';
// return AuthService.comparePasswords
// (password,hash)
//          .then(password => {
//            if (!password)
//             return res.status(400).json({
//                error: 'Incorrect password',
//             })  
                                       
  