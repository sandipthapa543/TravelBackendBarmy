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
db.activities = require("../model/activities.model")(sequelize, Sequelize);
db.sequelize.sync();

describe("2.Admin Activity", () => {
  describe("Admin add Activity", () => {
    //Package test
    it("Should add the Activity,", () => {
      //manaul values
      return db.activities
        .create({
          id: 1,
          Activity_Name: "Hiking",
          Contents: "whatcontent?",
          Image: "youWish",
          Slug: "hiking",
        })
        .then((result) => {
          assert.equal(result.Activity_Name, "Hiking");
          expect(result.id).to.equal(1);
          expect(result.Activity_Name).to.equal("Hiking");
          expect(result.Contents).to.equal("whatcontent?");
          expect(result.Image).to.equal("youWish");
          expect(result.Slug).to.equal("hiking");
        });
    });
  });
  describe("Admin update activities", () => {
    it("Should update the Activity", () => {
      db.activities.update(
        {
          Activity_Name: "Trek",
        },
        {
          where: { id: 1 },
          returning: true,
          plain: true,
        }
      );
    });
  });

  describe("Admin delete activity", () => {
    it("Should delete the Activity", () => {
      db.activities.destroy({
        where: { id: 1 },
        // truncate: true,
      });
    });
  });
});
