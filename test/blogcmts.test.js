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
db.blogcomments = require("../model/blogcmts.model")(sequelize, Sequelize);
db.sequelize.sync();

describe("Add Blog Comments user", () => {
  //blog comment test
  it("Should add the blog comment", () => {
    return db.blogcomments
      .create({
        blog_id: 1,
        user_id: 3,
        Comments: "Travel&Tourism",
      })
      .then((result) => {
        assert.equal(result.blog_id, 1);
        expect(result.blog_id).to.equal(1);
        expect(result.user_id).to.equal(3);
        expect(result.Comments).to.equal("Travel&Tourism");
      });
  });
});
