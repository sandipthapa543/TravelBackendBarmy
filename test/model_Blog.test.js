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
db.blogs = require("../model/add.blog")(sequelize, Sequelize);
db.sequelize.sync();

describe("User adding blog", () => {
  //Package test
  it("Should add the blog,", () => {
    //manaul values
    return db.blogs
      .create({
        Title: "Mt.Everest",
        Contents: "How_to_travel?",
        Image: "BaseCamp",
        user_id: 112,
        Likes: "1000",
      })
      .then((result) => {
        assert.equal(result.Title, "Mt.Everest");
        expect(result.Title).to.equal("Mt.Everest");
        expect(result.Contents).to.equal("How_to_travel?");
        expect(result.Image).to.equal("BaseCamp");
        expect(result.user_id).to.equal(112);
        expect(result.Likes).to.equal("1000");
      });
  });
});
