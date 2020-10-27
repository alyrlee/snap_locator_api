const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const {makeUsersArray} = require('./users.fixtures');
const helpers = require('./store-helpers');
const supertest = require('supertest');

describe ('Authorized Endpoints', function() {
    let db;

    // const { testUsers } = helpers.makeArticlesFixtures()
    // const testUser = testUsers[0]

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

    afterEach('cleanup', () => db('users').truncate());

    afterEach('cleanup', () => db('users').delete());

    describe (`POST /api/auth/login`, () => {
        
        beforeEach('insert users', () => {
            helpers.seedUsers(
                db,
                testUsers
            )
        })

        // insert user saved location data for SNAP grocers and locations
        beforeEach('insert user saved location data', () => {
            return db
            .into('store_locations')
        })

        const requiredFields = ['username', 'password'];

        requiredFields.forEach(field => {
            const loginAttemptBody = {
                username: testUser.username,
                password: testUser.password
            }

            it (`responds with 400 required error when ${field} is missing`, () => {
                delete loginAttemptBody[field]

                return supertest(app)
                    .post('/api/auth/login')
                    .send(loginAttemptBody)
                    .expect(400, {error: `Missing ${field} in request body.`})
            })

            it (`responds 400 'incorrect username or password' when bad creds provided`, () => {
                const invalidUser = {username: 'not-user', password: 'notpassword10'};

                return supertest(app)
                    .post('/api/auth/login')
                    .send(invalidUser)
                    .expect(400, {error: `Incorrect username or password.`})
            })

            it (`responds 400 'incorrect username or password' when bad password`, () => {
                const badPassword = {username: testUser.username, password: 'incorrect'};

                return supertest(app)
                    .post('/api/auth/login')
                    .send(badPassword)
                    .expect(400, {error: `Incorrect username or password.`})
            })

            it ('responds 200 and JWT auth token using secret when valid credentials', () => {
                const validCreds = {
                    username: testUser.username,
                    password: testUser.password,
                }

                const expectedToken = jwt.sign(
                    {user_id: testUser.id},  //payload
                    process.env.JWT_SECRET,
                    {
                        subject: testUser.username,
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