const express = require("express");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const PackageReviewController = require("../controller/packageReviewController");
const auth = require("../middleware/auth");
const PackReview = new PackageReviewController();

const validateAllFields = () => [
  // rating validation
  check("rating")
    .notEmpty()
    .withMessage("Please enter contents")
    .isNumeric()
    .withMessage("Rating must contain number"),

  //Content validation
  check("contents").notEmpty().withMessage("Content Please"),
];

routes
  .route("/review")
  .post(auth.verifyUser, validateAllFields(), (req, res) => {
    const error = validationResult(req); //field validation request

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    PackReview.addPackageReview(req, res);
  })
  .get(PackReview.allPackageReview);
module.exports = routes;
