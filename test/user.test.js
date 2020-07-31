const { expect, assert } = require("chai");
const request = require("supertest");
const app = require("../app");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  `postgres://postgres:postgres@localhost/TravelTest`,
  {
    logging: false,
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

describe("5.Register & Login", () => {
  describe("Register TDD", () => {
    // User registration test
    it("Should add the user", () => {
      // .
      return db.users
        .create({
          id: 1,
          First_Name: "Om Krishna",
          Last_Name: "Thapa",
          Email: "othapa@gmail.com",
          Password: "password",
          Country: "Nepal",
          City: "Kathmandu",
          Contact_No: "9876543210",
        })
        .then((result) => {
          assert.equal(result.First_Name, "Om Krishna");
          assert.equal(result.id, 1);
          expect(result.First_Name).to.equal("Om Krishna");
          expect(result.Last_Name).to.equal("Thapa");
          expect(result.Email).to.equal("othapa@gmail.com");
          expect(result.Password).to.equal("password");
          expect(result.Country).to.equal("Nepal");
          expect(result.City).to.equal("Kathmandu");
          expect(result.Contact_No).to.equal("9876543210");
        });
    });
  });

  describe("Empty the table", () => {
    it("Should clean the database", () => {
      db.users.destroy({
        where: { id: 1 },
        // truncate: true,
      });
    });
  });

  describe("Login TDD", () => {
    // User registration test
    it("Should login and generate jwt", () => {
      // .
      request(app)
        .post("/user/login")
        .send({ email: "othapa@gmail.com", password: "password" })
        .expect(200)
        .expect((res) => {
          expect(res.headers[x - auth]).not.toBeNull();
        });
    });
  });
});
