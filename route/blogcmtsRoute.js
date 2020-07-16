const express = require("express");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const blogComtsController = require("../controller/blogComtsController");
const auth = require("../middleware/auth");
const blogCmts = new blogComtsController();

const validateAllFields = () => [
  // comment validation
  check("comments").notEmpty().withMessage("Please enter comment"),
];

routes
  .route("/addblog")
  .post(auth.verifyUser, validateAllFields(), (req, res) => {
    const error = validationResult(req); //* field validation request

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    blogCmts.addBlogComment(req, res);
  })
  .get(blogCmts.allBlogComment);

module.exports = routes;
