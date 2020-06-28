const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const adminController = require("../controller/adminPackageController");
const packDetails = new adminController();

const validateAllFields = () => [
  //* Package name validation
  check("package_name")
    .notEmpty()
    .withMessage("Please enter Package Name")
    .isAlpha()
    .withMessage("Name must contain alphabets")
    // .isLength({ min: 3 })
    .withMessage("Name must contain atleast 3 alphabets"),

  //* Days validation
  check("days")
    .notEmpty()
    .withMessage("Please enter days")
    .isAlpha()
    .withMessage("Name must contain digits"),
  // .isLength({ min: 3 })
  // .withMessage("Name must contain atleast 3 alphabets")

  //* Price validation
  check("price")
    .notEmpty()
    .withMessage("Please enter price")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  //.withMessage("Name must contain atleast 3 alphabets")

  //* Package name valaidation
  check("includes")
    .notEmpty()
    .withMessage("Please enter includes")
    .isAlpha()
    .withMessage("Name must contain alphabets")
    // .isLength({ min: 3 })
    .withMessage("Name must contain atleast 3 alphabets"),

  //* excludes validation
  check("excludes")
    .notEmpty()
    .withMessage("Please enter excludes")
    .isAlpha()
    .withMessage("Name must contain alphabets")
    // .isLength({ min: 3 })
    .withMessage("Name must contain atleast 3 alphabets"),

  //* itinerary  validation
  check("itinerary")
    .notEmpty()
    .withMessage("Please enter itinerary")
    .isAlpha()
    .withMessage("Name must contain alphabets")
    // .isLength({ min: 3 })
    .withMessage("Name must contain atleast 3 alphabets"),

  //* difficulty_level validation
  check("difficulty_level")
    .notEmpty()
    .withMessage("Please enter difficulty_level")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  //.withMessage("Name must contain atleast 3 alphabets"),

  //* description validation
  check("description")
    .notEmpty()
    .withMessage("Please enter description")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  //.withMessage("Name must contain atleast 3 alphabets"),

  //* country name validation
  check("country")
    .notEmpty()
    .withMessage("Please enter Country Name")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  // .withMessage("Name must contain atleast 3 alphabets"),

  //* best_season validation
  check("best_season")
    .notEmpty()
    .withMessage("Please enter best_season")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  // .withMessage("Name must contain atleast 3 alphabets"),

  //* activity_id validation
  check("activity_id")
    .notEmpty()
    .withMessage("Please enter activity_id")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  // .withMessage("Name must contain atleast 3 alphabets"),

  //* accomodation validation
  check("accomodation")
    .notEmpty()
    .withMessage("Please enter accomodation")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  //.withMessage("Name must contain atleast 3 alphabets"),

  //* highest_point validation
  check("highest_point")
    .notEmpty()
    .withMessage("Please enter highest_point")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  //.withMessage("Name must contain atleast 3 alphabets"),

  //*starting_point validation
  check("starting_point")
    .notEmpty()
    .withMessage("Please enter starting_point")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  // .withMessage("Name must contain atleast 3 alphabets"),

  //* gears_required validation
  check("gears_required")
    .notEmpty()
    .withMessage("Please enter gears_required")
    .isAlpha()
    .withMessage("Name must contain alphabets"),
  // .isLength({ min: 3 })
  //.withMessage("Name must contain atleast 3 alphabets"),

  //* image validation
  check("image").notEmpty().withMessage("Please select image").isAlpha(),
  //.withMessage("Name must contain alphabets")
  // .isLength({ min: 3 })
  // .withMessage("Name must contain atleast 3 alphabets"),
];

//* post  form api router

routes.post("/admin/package", validateAllFields(), (req, res) => {
  const error = validationResult(req); //* field validation request

  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  }
  packDetails.addPackage(req, res);
});

module.exports = routes;