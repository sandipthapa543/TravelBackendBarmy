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
db.package = require("../model/package.model")(sequelize, Sequelize);
db.sequelize.sync();

describe("Admin add Packages", () => {
  //Package test
  it("Should add the packages,", () => {
    //manaul values
    return db.package
      .create({
        Package_Name: "Goa",
        Days: 2,
        Price: 300,
        Includes: "what",
        Excludes: "dontknow",
        Itinerary: "iam",
        Difficulty_level: 2,
        Description: "great",
        Country: "India",
        Best_season: "Spring",
        Activity_id: 1,
        Accomodation: "lob",
        Highest_point: "tha",
        Starting_point: "ha",
        Gears_required: "la",
        Image: "imz",
        Slug: "hiking",
      })
      .then((result) => {
        assert.equal(result.Package_Name, "Goa");
        expect(result.Package_Name).to.equal("Goa");
        expect(result.Days).to.equal(2);
        expect(result.Price).to.equal(300);
        expect(result.Includes).to.equal("what");
        expect(result.Excludes).to.equal("dontknow");
        expect(result.Itinerary).to.equal("iam");
        expect(result.Difficulty_level).to.equal(2);
        expect(result.Description).to.equal("great");
        expect(result.Country).to.equal("India");
        expect(result.Best_season).to.equal("Spring");
        expect(result.Activity_id).to.equal(1);
        expect(result.Accomodation).to.equal("lob");
        expect(result.Highest_point).to.equal("tha");
        expect(result.Starting_point).to.equal("ha");
        expect(result.Gears_required).to.equal("la");
        expect(result.Image).to.equal("imz");
        expect(result.Slug).to.equal("hiking");
      });
  });
});
