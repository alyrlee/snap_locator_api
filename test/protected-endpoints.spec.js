const knex = require('knex');
const app = require('../src/app');
const {makeStoresArray} = require('./stores.fixtures');
const {makeUsersArray} = require('./users.fixtures');
const helpers = require('./test-helpers');
const supertest = require('supertest');

describe ('Protected Endpoints', function() {
    let db; 

    const testStores = makeStoresArray();
    const testUsers = makeUsersArray();

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());

    before('clean the second table', () => db('snap_locator__users').delete());

    before('clean the first table', () => db('store_locations').truncate());

    afterEach('cleanup second table', () => db('snap_locator_users').delete());

    afterEach('cleanup first table', () => db('store_locations').truncate());

    beforeEach('insert test users', () => {
        return db
        .into('snap_locator_users')
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
            name: `GET /api/stores:sores_id`,
            path: '/api/stores/1',
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