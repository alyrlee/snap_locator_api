const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const {makeUsersArray} = require('./users.fixtures');
const helpers = require('./test-helpers');
const supertest = require('supertest');

describe ('Authorized Endpoints', function() {
    let db;

    const testUsers = makeUsersArray();
    const testUser = testUsers[0];

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy());

    afterEach('cleanup', () => db('snap_locations').truncate());

    afterEach('cleanup', () => db('snap_locator_users').delete());

    describe (`POST /api/auth/login`, () => {
        
        beforeEach('insert users', () => {
            helpers.seedUsers(
                db,
                testUsers
            )
        })

        // insert comments and view feedback for SNAP grocers and locations
        // beforeEach('insert user feedback', () => {
        //     return db
        //     .into('store_locations')
        // })

        const requiredFields = ['user_name', 'password'];

        requiredFields.forEach(field => {
            const loginAttemptBody = {
                user_name: testUser.user_name,
                password: testUser.password
            }

            it (`responds with 400 required error when ${field} is missing`, () => {
                delete loginAttemptBody[field]

                return supertest(app)
                    .post('/api/auth/login')
                    .send(loginAttemptBody)
                    .expect(400, {error: `Missing ${field} in request body.`})
            })

            it (`responds 400 'incorrect user_name or password' when bad creds provided`, () => {
                const invalidUser = {user_name: 'not-user', password: 'notpassword10'};

                return supertest(app)
                    .post('/api/auth/login')
                    .send(invalidUser)
                    .expect(400, {error: `Incorrect user_name or password.`})
            })

            it (`responds 400 'incorrect user_name or password' when bad password`, () => {
                const badPassword = {user_name: testUser.user_name, password: 'incorrect'};

                return supertest(app)
                    .post('/api/auth/login')
                    .send(badPassword)
                    .expect(400, {error: `Incorrect user_name or password.`})
            })

            it ('responds 200 and JWT auth token using secret when valid credentials', () => {
                const validCreds = {
                    user_name: testUser.user_name,
                    password: testUser.password,
                }

                const expectedToken = jwt.sign(
                    {user_id: testUser.id},
                    process.env.JWT_SECRET,
                    {
                        subject: testUser.user_name,
                        expiresIn: process.env.JWT_EXPIRY,
                        algorithm: 'HS256',
                    }
                )

                return supertest(app)
                    .post('/api/auth/login')
                    .send(validCreds)
                    .expect(200, {
                        authToken: expectedToken
                    })
            })
        })
    })
})