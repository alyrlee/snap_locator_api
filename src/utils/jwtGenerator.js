// const AuthService = require('../auth/auth-service');

// // middleware to handle jwt authentication on login requests to the server. //
// function requireAuth(req, res, next) {
//     const authToken = req.get('Authorization') || '';
//     console.log(authToken);

//     const token = req.header("jwt_token");

//     if (!authToken.toLowerCase().startsWith('bearer ')) {
//         return res.status(401).json({error: `Missing bearer token`});
//     }
//     else {
//         bearerToken = authToken.slice(7, authToken.length);
//     }

//     try {
//         const payload = AuthService.verifyJwt(bearerToken);

//         AuthService.getRegisteredUser(
//             req.app.get('db'),
//             payload.sub,
//         )
//             .then(user => {
//                 if (!user) {
//                     return res.status(401).json({error: `Unauthorized request`});
//                 }
//                 req.user = user;
//                 next();
//             })
//             .catch(err => {
//                 console.error(err);
//                 next(err);
//             })
//     }
//     catch(error) {
//         res.status(401).json({error: `Unauthorized request`});
//     }
// }

// module.exports = {
//     requireAuth,
// }

const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;