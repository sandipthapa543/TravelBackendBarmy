const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const adminController = require("../controller/adminController");
const img = require("../middleware/ImageUpload");
const admin = new adminController();

const validateSomeFields = () => [
  //* Package name validation
  check("name")
    .notEmpty()
    .withMessage("Please enter Package Name")
    .isLength({ min: 3 })
    .withMessage("Name must contain atleast 3 alphabets"),

  //* description validation
  check("description").notEmpty().withMessage("Please enter description"),
];

const validateAllFields = () => [
  //* Days validation
  check("days")
    .notEmpty()
    .withMessage("Please enter days")
    .isNumeric()
    .withMessage("Days must contain digits"),

  //* Price validation
  check("price")
    .notEmpty()
    .withMessage("Please enter price")
    .isNumeric()
    .withMessage("Price must contain digits only"),

  //* Package name valaidation
  check("includes").notEmpty().withMessage("Please enter includes"),

  //* excludes validation
  check("excludes").notEmpty().withMessage("Please enter excludes"),

  //* itinerary  validation
  check("itinerary").notEmpty().withMessage("Please enter itinerary"),

  //* difficulty_level validation
  check("difficulty_level")
    .notEmpty()
    .withMessage("Please enter difficulty_level")
    .isNumeric()
    .withMessage("Enter 1-5 for difficulty level"),

  //* country name validation
  check("country").notEmpty().withMessage("Please enter Country Name"),

  //* best_season validation
  check("best_season").notEmpty().withMessage("Please enter best_season"),
  // .isLength({ min: 3 })
  // .withMessage("Name must contain atleast 3 alphabets"),

  //* activity_id validation
  check("activity_id")
    .notEmpty()
    .withMessage("Please enter activity_id")
    .isNumeric()
    .withMessage("Activity id must be digits only"),
  // .isLength({ min: 3 })
  // .withMessage("Name must contain atleast 3 alphabets"),

  //* accomodation validation
  check("accomodation").notEmpty().withMessage("Please enter accomodation"),

  //* highest_point validation
  check("highest_point").notEmpty().withMessage("Please enter highest_point"),

  //*starting_point validation
  check("starting_point").notEmpty().withMessage("Please enter starting_point"),

  //* gears_required validation
  check("gears_required").notEmpty().withMessage("Please enter gears_required"),
];

//* post  form api router

routes.post(
  "/package",
  img.packageImage,
  validateSomeFields(),
  validateAllFields(),
  (req, res) => {
    const error = validationResult(req); //* field validation request

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    admin.addPackage(req, res);
  }
);

routes.route("/package/:id").patch(admin.updatePackage)
// .delete(admin.deleteProduct)

routes.post(
  "/activity",
  img.activityImage,
  validateSomeFields(),
  (req, res) => {
    const error = validationResult(req); //* field validation request

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    admin.addActivity(req, res);
  }
);

routes.put('/:id',admin.updateActivity);
routes.delete("/:id",admin.deleteActivity);
routes.put('/packages/:id',admin.updatePackage);
routes.delete('/packages/:id',admin.deletePackages);
module.exports = routes;
