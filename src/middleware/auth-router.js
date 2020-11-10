const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json(); 

// router to handle authenticated logins. //
authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const {username, password} = req.body;
        const loginCreds = {username, password};
        console.log('user creds', loginCreds);


        for (const [key, value] of Object.entries(loginCreds)) {
            if (value == null) {
                return res.status(400).json({error: `Missing ${key} in request body.`});
            }
        }
        console.log('user creds', loginCreds);

        AuthService.getRegisteredUser(
            req.app.get('db'),
            loginCreds.username
        )
            .then(dbUser => {
                if (!dbUser) {
                    return res.status(400).json({error: `Incorrect username or password.`});
                }
                return AuthService.comparePasswords(loginCreds.password, dbUser.password)
                    .then(compareMatch => {
                        if (!compareMatch) {
                            return res.status(400).json({error: `Incorrect username or password.`});
                        }
                        
                        const sub = dbUser.username;
                        const payload = {user_id: dbUser.id};
                        console.log('who is the db user?', sub);
                        console.log('return user id and dbUser id', payload);

                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                        });
                    });
            })
            .catch(next);
    }) 
    .post('/signup', jsonBodyParser, (req, res, next) => {
        const {password, username} = req.body;

        for (const field of ['username', 'password']) {
            if (!req.body[field]) {
                return res.status(400).json({error: `Missing '${field}' in request body.`});
            }
        }
        const passwordChecker = AuthService.validatePassword(password);
        if (passwordChecker) {
            return res.status(400).json({error: passwordChecker});
        }

        AuthService.hasDuplicateUser(
            req.app.get('db'),
            username
        )
            .then(hasDuplicateUser => {
                if (hasDuplicateUser) {
                    return res.status(400).json({error: `Username already taken.`});
                }
                
                return AuthService.hashPassword(password)
                    .then(hashedPassword => {  
                        const newUser = {
                            username,
                            password: hashedPassword,
                            date_created: 'now()'
                        };

                        return AuthService.insertNewUser(
                            req.app.get('db'),
                            newUser
                        )
                        .then(user => {
                            res
                                .status(201)
                                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                .json(AuthService.serializeUser(user));
                        })
                    });
            })
            .catch(next);
    });

module.exports = authRouter;