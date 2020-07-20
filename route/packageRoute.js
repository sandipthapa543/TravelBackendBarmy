const express = require("express");
const routes = express.Router();
const packageController = require("../controller/packageController");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const package = new packageController();

routes.get("/show", package.allPackage);
routes.get("/activity/:slug", package.singleActivity);
routes.get("/activity", package.allActivity);

routes.route("/single/:slug").get(package.onePackage);

const validateRating = () => [
  // rating validation
  check("rating")
    .notEmpty()
    .withMessage("Please select rating")
    .isNumeric()
    .withMessage("Rating must contain number"),

  //Content validation
  check("review").notEmpty().withMessage("Content Please"),
];

routes
  .route("/review/:id")
  .post(auth.verifyUser, validateRating(), (req, res) => {
    const error = validationResult(req); //field validation request

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    package.addPackageReview(req, res);
  })
  .get(package.allPackageReview);


module.exports = routes;
