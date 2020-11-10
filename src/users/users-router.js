// const express = require('express');
// const AuthService  = require('../middleware/auth-service')

// const path = require('path');
// const UsersService = require('./user-service');
// const usersRouter = express.Router();
// const jsonBodyParser = express.json();

// //1. destructure the req.body
// //2. check if user exists 
// //3. Bycrypt the user password
// //4. enter the new user inside our database
// //5. generating jwt token 


// usersRouter
//     .post('/signup', jsonBodyParser, (req, res, next) => {
//         const {password, username} = req.body;
//         for (const field of ['username', 'password']) {
//             if (!req.body[field]) {
//                 return res.status(400).json({error: `Missing '${field}' in request body.`});
//             }
//         }
//         const passwordChecker = UsersService.validatePassword(password);
//         if (passwordChecker) {
//             return res.status(400).json({error: passwordChecker});
//         }

//         UsersService.hasDuplicateUser(
//             req.app.get('db'),
//             username
//         )
//             .then(hasDuplicateUser => {
//                 if (hasDuplicateUser) {
//                     return res.status(400).json({error: `Username already taken.`});
//                 }
                
//                 return UsersService.hashPassword(password)
//                     .then(hashedPassword => {  
//                         const newUser = {
//                             username,
//                             password: hashedPassword,
//                             date_created: 'now()'
//                         };

//                         return UsersService.insertNewUser(
//                             req.app.get('db'),
//                             newUser
//                         )
//                         .then(user => {
//                             res
//                                 .status(201)
//                                 .location(path.posix.join(req.originalUrl, `/${user.id}`))
//                                 .json(UsersService.serializeUser(user));
//                         })
//                     });
//             })
//             .catch(next);
//     });

// module.exports = usersRouter;