const knex = require('knex');
const app = require('../src/app');
const {makeStoresArray} = require('./stores.fixtures');
const helpers = require('./test-helpers');
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
    before('clean the first table', () => db('snap_locations').truncate());
    afterEach('cleanup first table', () => db('snap_locations').truncate());

    describe (`GET /api/stores`, () => {
        context('Given there is no store feedback in the database', () => {
            const testStores = makeStoresArray();
                    
            beforeEach('insert test stores', () => {
                helpers.seedStores(db, testStores)
            })
            
            it ('Responds with 200 and SNAP locations not found', () => {
                return supertest(app)
                    .get('/api/stores')
                    .set('Authorization', helpers.makeAuthHeader(testStores[0]))
                    .expect(200, [])
            })
        })
    
        context ('Given there is a store in the database', () => {
            const testStores = makeStoresArray();
            const validStores = testStores[0];
                    
            beforeEach('insert test stores', () => {
                helpers.seedStores(db, testStores)
            })

            beforeEach('insert test stores', () => {
                return db
                .into('stores')
                .insert(testStores)
            });

            beforeEach('insert store', () => {
                return db
                .into('snap_locations')
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
                        const validStores = testStores[0];
                        const invalidSecret = 'bad-secret';

                        return endpoint.method(endpoint.path)
                            .set('Authorization', helpers.makeAuthHeader(validStores, invalidSecret))
                            .expect(401, {error: `Unauthorized request`})
                    })

                //     it ('Responds with 401 `Unauthorized request` when invalid sub in payload', () => {
                //         const invalidUser = {username: 'fake-user', id: 1}

                //         return endpoint.method(endpoint.path)
                //             .set('Authorization', helpers.makeAuthHeader(invalidUser))
                //             .expect(401, {error: `Unauthorized request`})
                //     })
                })
            })
        })
    })
})