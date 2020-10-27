const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const {makeUsersArray} = require('./users.fixtures');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');

describe ('User Endpoints', function() {
    let db;

    const testUsers = makeUsersArray();
    const testUser = testUsers[0]

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy());

    afterEach('cleanup', () => db('').truncate());

    afterEach('cleanup', () => db('users').delete());

    describe ('POST /api/users', () => {
        context ('User Validation', () => {
            
            beforeEach('insert users', () => {
                helpers.seedUsers(db, testUsers)
            })

            const requiredFields = ['username', 'password'];

            requiredFields.forEach(field => {
                const registerAttempt = {
                    username: 'test username',
                    password: 'test password'
                }

                it (`Responds with 400 when required ${field} is missing`, () => {
                    delete registerAttempt[field]

                    return supertest(app)
                        .post('/api/users')
                        .send(registerAttempt)
                        .expect(400, {error: `Missing '${field}' in request body.`})
                })
            })

            it ('Responds 400 when password is less than 8 characters', () => {
                const shortPassword = {
                    username: 'test username',
                    password: '1234567'
                }

                return supertest(app)
                    .post('/api/users')
                    .send(shortPassword)
                    .expect(400, {error: `Password must be longer than 8 characters.`})
            })

            it ('Responds 400 when password is less than 72', () => {
                const longPassword = {
                    username: 'test username',
                    password: '*'.repeat(73)
                }

                return supertest(app)
                    .post('/api/users')
                    .send(longPassword)
                    .expect(400, {error: `Password must be less than 72 characters.`})
            })

            it ('Responds 400 when password begins with a space', () => {
                const spacePassword = {
                    username: 'test username', 
                    password: ' 123ses4meStreet!'
                }

                return supertest(app)
                    .post('/api/users')
                    .send(spacePassword)
                    .expect(400, {error: `Password must not start or end with a space.`})
            })

            it ('Responds 400 when password ends with a space', () => {
                const spacePassword = {
                    username: 'test username', 
                    password: '123ses4meStreet! '
                }

                return supertest(app)
                    .post('/api/users')
                    .send(spacePassword)
                    .expect(400, {error: `Password must not start or end with a space.`})
            })

            it ('Responds 400 when password is not complex enough', () => {
                const basicPassword = {
                    username: 'test username',
                    password: '11AAaabb'
                }

                return supertest(app)
                    .post('/api/users')
                    .send(basicPassword)
                    .expect(400, {error: `Password must contain 1 upper case letter, lower case letter, number, and special character.`})
            })

            it (`Responds 400 'User name already taken' when username isn't unique`, () => {
                const duplicateUser = {
                    username: testUser.username,
                    password: '11AAaa!!'
                }

                return supertest(app)
                    .post('/api/users')
                    .send(duplicateUser)
                    .expect(400, {error: `Username already taken.`})
            }) 
        })
    })

    describe ('Successful user POST request', () => {
        it ('Responds 201, serializes user, and stores bcrypted password', () => {
            const newUser = {
                username: 'test username',
                password: '11AAaa!!'
            }

            return supertest(app)
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.username).to.eql(newUser.username)
                    expect(res.body).to.not.have.property('password')
                    expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)

                    const expectedDate = new Date().toLocaleString('en', {timezone: 'UTC'});
                    const actualDate = new Date(res.body.date_created).toLocaleString();

                    expect(actualDate).to.eql(expectedDate)
                })
                .expect(res => {
                    db
                        .from('users')
                        .select('*')
                        .where({id: res.body.id})
                        .first()
                        .then(row => {
                            expect(row.username).to.eql(newUser.username)

                            const expectedDate = new Date().toLocaleString('en', {timezone: 'UTC'});
                            const actualDate = new Date(res.body.date_created).toLocaleString();

                            expect(actualDate).to.eql(expectedDate)

                            return bcrypt.compare(newUser.password, row.password)
                        })
                        .then(compareMatch => {
                            expect(compareMatch).to.be.true
                        })
                })
        })
    }) 

})
