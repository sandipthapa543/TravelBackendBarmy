const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const blogController = require("../controller/blogController");
const img = require("../middleware/ImageUpload");
const blogDetails = new blogController();

const validateAllFields = () => [
  // Title validation
  check("title").notEmpty().withMessage("Please enter your title"),

  //Content validation
  check("contents").notEmpty().withMessage("Please enter content"),

  //likes validation
  check("likes").notEmpty().withMessage("Like"),

  //user_id validation
  check("user_id").notEmpty().withMessage("Provide user id ?"),
];

routes.post("/blog", img.blogImage, validateAllFields(), (req, res) => {
  const error = validationResult(req); //* field validation request

  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  }
  blogDetails.addBlog(req, res);
});

module.exports = routes;
