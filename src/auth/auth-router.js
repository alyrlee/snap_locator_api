const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json(); 

// router to handle authenticated logins. //
authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const {userName, password} = req.body;
        const loginCreds = {userName, password};

        for (const [key, value] of Object.entries(loginCreds)) {
            if (value == null) {
                return res.status(400).json({error: `Missing ${key} in request body.`});
            }
        }
        console.log('user creds', loginCreds);

        AuthService.getRegisteredUser(
            req.app.get('db'),
            loginCreds.userName
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
                        
                        const sub = dbUser.userName;
                        const payload = {user_id: dbUser.id};

                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                        });
                    });
            })
            .catch(next);
    });

module.exports = authRouter;