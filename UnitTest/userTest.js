const { expect, assert } = require("chai");
const request = require('supertest')
const app = (require("../app"));

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  `postgres://postgres:postgres@localhost/TravelTest`,
  {
    dialect: "postgres",

    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../model/user.model.js")(sequelize, Sequelize);
// db.sequelize.sync({ force: true })
db.sequelize.sync();

describe("Register TDD", () => {
  // User registration test
  it("The following user will be added", () => {
    // .
    return db.users
      .create({
        First_Name: "Om Krishna",
        Last_Name: "Thapa",
        Email: "othapa@gmail.com",
        Password: "password",
        Country: "Nepal",
        City: "Kathmandu",
        Contact_No: "9876543210",
      })
      .then((result) => {
          assert.equal(result.First_Name,"Om Krishna");
        expect(result.First_Name).to.equal("Om Krishna");
        expect(result.Last_Name).to.equal("Thapa");
        expect(result.Email).to.equal("othapa@gmail.com");
        expect(result.Country).to.equal("Nepal");
      });
  });
});

describe("Empty the table", () => {
    it("It should clean the database", () => {
    return db.sequelize.sync({ force: true })
    })
})

describe("Login TDD", () => {
  // User registration test
  it("It should login and generate jwt", () => {
    // .
    request(app)
      .post("/user/login")
      .send({ email: "othapa@gmail.com", password: "password" })
      .expect(200)
      .expect(res => {
          expect(res.headers[x-auth]).not.toBeNull();
      })
  });
});
