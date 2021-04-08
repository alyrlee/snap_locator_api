const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.only("Auth Endpoints", function () {
  let db;

  // console.log("helpers", helpers);

  const testUsers  = helpers.makeUsersArray();
  const testUser1 = testUsers[0];
  const testUser2 = testUsers[1];
 

  console.log("testUsers", testUsers);

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`POST /api/auth/login`, () => {
    beforeEach("insert users", () => helpers.makeUsersArray(db, testUsers));

    const requiredFields = ["user_name", "password"];

    requiredFields.forEach((field) => {
      const loginAttemptBody = {
        user_name: testUser1.user_name,
        password: testUser1.password,
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];

        return supertest(app)
          .post("/api/auth/login")
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });

    it(`responds 400 'invalid user_name or password' when bad user_name`, () => {
      const userInvalidUser = {
        user_name: "user-not",
        password: testUsers.password,
      };
      return supertest(app)
        .post("/api/auth/login")
        .send(userInvalidUser)
        .expect(400, { error: `Incorrect user_name` });
    });

    it(`responds 400 'invalid password' when bad password`, () => {
      const userInvalidPass = {
        user_name: testUsers.user_name,
        password: "incorrect",
      };
      return supertest(app)
        .post("/api/auth/login")
        .send(userInvalidPass)
        .expect(400, { error: `Incorrect password` });
    });

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        user_name: testUsers.user_name,
        password: testUsers.password,
      };
      const expectedToken = jwt.sign(
        { user_id: testUsers.id },
        process.env.JWT_SECRET,
        {
          subject: testUsers.user_name,
          algorithm: "HS256",
        }
      );
      return supertest(app)
        .post("/api/auth/login")
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
        });
    });
  });
});
