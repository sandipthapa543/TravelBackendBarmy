const { expect } = require("chai");
const { response } = require("../app");
const app = require("../app");

const Sequelize = require("sequelize");
var chai = require("chai");
var chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// Make sure to change the given fields, Email and Password!
const loginData = {
  Email: "sfsf@gmail.com",
  Password: "password",
};

var token = "";

// App test
describe("App", () => {
  it("Should Exists", () => {
    expect(app).to.be.a("function");
  });
});

// GET travel
describe("/GET Travel", () => {
  it("Should Welcome the Travel Application", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        expect(res.body.message).to.contain("Welcome to Travel Application.");
        done();
      });
  });

  // GET all package
  describe("/GET Package", () => {
    it("Should GET all package", (done) => {
      chai
        .request(app)
        .get("/package/show?sort=Price&order=DESC")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });

  // GET Blog
  describe("/GET Blog", () => {
    it("Should GET all blogs", (done) => {
      chai
        .request(app)
        .get("/blog/all")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });
});

// Api test, POST for user login
describe("/POST user login", () => {
  it("Should Login user", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .send(loginData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        token = res.body.token;
        done();
      });
  });
});

// Api test, GET user 401
describe("/GET user", () => {
  it("Should GET all users", (done) => {
    chai
      .request(app)
      .get("/user/inquiry/all")
      .set("Authorization", "")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        expect(res.body.message).to.contain("Please Login first");
        expect(res.body.status).to.contain("Failed");
        done();
      });
  });
});

// Api test, Token invalid
describe("/GET user", () => {
  it("Should GET all users", (done) => {
    chai
      .request(app)
      .get("/user/inquiry/all")
      .set("Authorization", "Bearer asd")

      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        expect(res.body.message).to.contain("Token invalid. Login again.");
        expect(res.body.status).to.contain("Failed");
        done();
      });
  });
});

// Api test, GET all user
describe("/GET user", () => {
  it("Should GET all users", (done) => {
    chai
      .request(app)
      .get("/user/inquiry/all")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Array");
        done();
      });
  });
});

//Api test, POST blog comment
describe("/POST Blog Comment", () => {
  it("Should POST blog", (done) => {
    const data = {
      blog_id: 4,
      Comments: "TDD comment test.",
    };
    chai
      .request(app)
      .post("/blog/comment")
      .set("Authorization", "Bearer " + token)
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  });
});
