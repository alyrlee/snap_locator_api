const knex = require('knex');
const app = require('../src/app');
const {makeStoresArray} = require('./stores.fixtures');
const {makeUsersArray} = require('./users.fixtures');
const helpers = require('./store-helpers');
const supertest = require('supertest');

describe ('Stores Endpoints', function() {
    let db; 

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());
    before('clean the first table', () => db('store_locations').truncate());
    afterEach('cleanup first table', () => db('store_locations').truncate());

    describe (`GET /api/stores`, () => {
        context('Given there is no user feedback and comments in the database', () => {
            const testUsers = makeUsersArray();
                    
            beforeEach('insert test users', () => {
                helpers.seedUsers(db, testUsers)
            })
            
            it ('Responds with 200 and SNAP locations not found', () => {
                return supertest(app)
                    .get('/api/stores')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, [])
            })
        })
    
        context ('Given there is user in the database', () => {
            const testStores = makeStoresArray();
            const testUsers = makeUsersArray();
            const validUser = testUsers[0];
                    
            beforeEach('insert test users', () => {
                helpers.seedUsers(db, testUsers)
            })

            beforeEach('insert test users', () => {
                return db
                .into('users')
                .insert(testUsers)
            });

            beforeEach('insert user feedback', () => {
                return db
                .into('store_locations')
                .insert(testStores)
            });

            const protectedEndpoints = [
                {
                    name: `GET /api/stores`,
                    path: '/api/stores/',
                    method: supertest(app).get,
                },
                {
                    name: `POST /api/stores`,
                    path: '/api/stores/',
                    method: supertest(app).post
                }
            ];

            protectedEndpoints.forEach(endpoint => {
                describe (endpoint.name, () => {
                    it ('Responds 401 `Missing bearer token` when no bearer token', () => {
                        return endpoint.method(endpoint.path)
                            .expect(401, {error: `Missing bearer token`})
                    })

                    it ('Responds 401 `Unauthorized request` when invalid JWT secret', () => {
                        const validUser = testUsers[0];
                        const invalidSecret = 'bad-secret';

                        return endpoint.method(endpoint.path)
                            .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
                            .expect(401, {error: `Unauthorized request`})
                    })

                    it ('Responds with 401 `Unauthorized request` when invalid sub in payload', () => {
                        const invalidUser = {user_name: 'fake-user', id: 1}

                        return endpoint.method(endpoint.path)
                            .set('Authorization', helpers.makeAuthHeader(invalidUser))
                            .expect(401, {error: `Unauthorized request`})
                    })
                })
            })
        })
    })
})