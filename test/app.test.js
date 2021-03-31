const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return a message from GET /api', () => {
    return supertest(app)
      .get('/api')
      .expect(200, 'Hello, welcome to SNAP Locator API');
  });
});