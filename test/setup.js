process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-jwt-secret'

require('dotenv').config()

process.env.TEST_DB_URL = process.env.TEST_DB_URL
  || "postgresql://ashley@localhost/snap_locator"

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest