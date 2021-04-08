process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-jwt-secret'

require('dotenv').config()

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
      || 'postgresql://ashley_dev:201030410Vera@localhost/snap_app_auth_test'
  /* || 'postgres://nsdquldjuminiw:52cdbad046bd1b9bc25ea812be935abd669e8a87c931dac3e6002d65077af50c@ec2-54-196-33-23.compute-1.amazonaws.com:5432/d9hqjm9h9fb7er_test' */
const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest
