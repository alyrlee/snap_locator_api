// const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
// const xss = require('xss');
// const bcrypt = require('bcryptjs');

// // service object to handle db queries to POST and authenticate new user registrations to the user database. //
// const UsersService = {
// //     hasDuplicateUser(db, userName) {
// //         return db('users')
// //             .where({userName}
// //             .first()
// //             .then(([user]) => !!user));
// //     },
// //     insertNewUser(db, newUser) {
// //         return db('users')
// //             .insert(newUser)
// //             .into('users')
// //             .returning('*')
// //             .then(([user]) => user);
// //     },
// //     validatePassword(password) {
// //         if (password.length < 8) {
// //             return `Password must be longer than 8 characters.`;
// //         }
// //         if (password.length > 72) {
// //             return `Password must be less than 72 characters.`;
// //         }
// //         if (password.startsWith(' ') || password.endsWith(' ')) {
// //             return `Password must not start or end with a space.`;
// //         }
// //         if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
// //             return `Password must contain 1 upper case letter, lower case letter, number, and special character.`;
// //         }
// //         return null;
// //     },
// //     hashPassword(password) {
// //         return bcrypt.hash(password, 12);
// //     },
// //     serializeUser(user) {
// //         return {
// //             id: user.id,
// //             username: xss(user.userName),
// //             date_created: new Date(user.date_created)
// //         };
// //     }
// // };

// module.exports = UsersService;