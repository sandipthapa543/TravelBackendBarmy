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
db.blogs = require("../model/blog.model")(sequelize, Sequelize);
db.sequelize.sync();

describe("3.User Blog", () => {
  describe("User adding blog", () => {
    //Package test
    it("Should add the blog,", () => {
      //manaul values
      return db.blogs
        .create({
          id: 1,
          Title: "Mt.Everest",
          Slug: "mt-everest",
          Contents: "How_to_travel?",
          Image: "BaseCamp",
          user_id: 112,
          Likes: "1000",
        })
        .then((result) => {
          assert.equal(result.Title, "Mt.Everest");
          expect(result.id).to.equal(1);
          expect(result.Title).to.equal("Mt.Everest");
          expect(result.Slug).to.equal("mt-everest");
          expect(result.Contents).to.equal("How_to_travel?");
          expect(result.Image).to.equal("BaseCamp");
          expect(result.user_id).to.equal(112);
          expect(result.Likes).to.equal("1000");
        });
    });
  });

  describe("Delete blog", () => {
    it("Should delete blogs", () => {
      db.blogs.destroy({
        where: { id: 1 },
        // truncate: true,
      });
    });
  });
});
