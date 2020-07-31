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
describe("-/GET Travel", () => {
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
});

// Api test, GET user 401
describe("-/User", () => {
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
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

// GET all package
describe("-/Package", () => {
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
  // Api test, POST package review
  describe("/POST Validate package review", () => {
    it("Should provide validation message", (done) => {
      const data = {
        rating: "Good",
        review: "Good package",
      };
      chai
        .request(app)
        .post("/package/review/1")
        .set("Authorization", "Bearer " + token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("Array");
          // console.log(res.body[0].msg);
          res.body[0].should.have.property("msg");
          expect(res.body[0].msg).to.contain("Rating must contain number");
          done();
        });
    });
  });

  // Api test, POST package review
  describe("/POST Package review", () => {
    it("Should add review about packages", (done) => {
      const data = {
        rating: 4,
        review: "Good package",
      };
      chai
        .request(app)
        .post("/package/review/1")
        .set("Authorization", "Bearer " + token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //delete routes testing
  describe("/Delete/:id packages", () => {
    it("Should not delete the packages info", (done) => {
      const id = 6;
      chai
        .request(app)
        .delete("/package//packages/:id" + id)

        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

// GET Blog
describe("-/Blog", () => {
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

  describe("/PUT/:id blog", () => {
    it("Should update the packages info", (done) => {
      const packages = {
        Comments: "m",
      };
      const id = 5;
      chai
        .request(app)
        .put("/blog/edit/:id" + id)
        .send(packages)
        .end((err, res) => {
          res.should.have.status(200);
          //  res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/Delete/:id blog", () => {
    it("Should delete the blog info", (done) => {
      const id = 2;
      chai
        .request(app)
        .delete("/blog/:id" + id)

        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

// GET all bookings
describe("-/Booking", () => {
  describe("/GET Bookings", () => {
    it("Should GET all bookings", (done) => {
      chai
        .request(app)
        .get("/booking/")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("Array");
          done();
        });
    });
  });

  // POST the bookings
  describe("/POST Bookings", () => {
    it("Should add booking", (done) => {
      const data = {
        user_id: 5,
        package_id: 3,
        People: 1,
        departure_dates: "02/02/2020",
      };
      chai
        .request(app)
        .post("/booking/")
        .set("Authorization", "Bearer " + token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // PUT bookings
  describe("/PUT Booking", () => {
    it("Should update booking info", (done) => {
      const packages = {
        status: "pending",
      };
      const id = 5;
      chai
        .request(app)
        .put("/booking/", +id)
        .send(packages)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
