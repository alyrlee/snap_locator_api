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

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};