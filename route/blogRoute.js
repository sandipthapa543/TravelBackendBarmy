const express = require("express");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const blogController = require("../controller/blogController");
const img = require("../middleware/ImageUpload");
const auth = require("../middleware/auth");
const blogDetails = new blogController();

const validateAllFields = () => [
  // Title validation
  check("title").notEmpty().withMessage("Please enter your title"),

  //Content validation
  check("contents").notEmpty().withMessage("Please enter content"),
];

routes
  .route("/add")
  .post(auth.verifyUser, img.blogImage, validateAllFields(), (req, res) => {
    const error = validationResult(req); //* field validation request

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    blogDetails.addBlog(req, res);
  })
  .get(blogDetails.allBlogs);

module.exports = routes;
