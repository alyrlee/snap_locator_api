process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-jwt-secret'

require('dotenv').config()

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
  || 'postgres://xjjnbkymmwibzv:2aa5a60dda71fc581ece0493a74901ade2fd024cd9e117db0e36c3afbfc7c420@ec2-52-7-168-69.compute-1.amazonaws.com:5432/d58gi1rjhfmr7g_test'

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest
