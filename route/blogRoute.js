const express = require("express");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const blogController = require("../controller/blogController");
const img = require("../middleware/ImageUpload");
const auth = require("../middleware/auth");
const blogDetails = new blogController();

const validateAllFields = () => [
  // Title validation
  check("Title").notEmpty().withMessage("Please enter your title"),

  //Content validation
  check("Contents").notEmpty().withMessage("Please enter content"),
];

const validateComments = () => [
  // comment validation
  check("Comments").notEmpty().withMessage("Please enter comment"),
];

routes
  .route("/add")
  .post(auth.verifyUser, img.blogImage, validateAllFields(), (req, res) => {
    const error = validationResult(req); //* field validation request

    if (!error.isEmpty()) {
      return res.status(422).json(error.array());
    }
    blogDetails.addBlog(req, res);
  })
  routes.get("/all",blogDetails.allBlogs);
  routes.get("/:slug",blogDetails.oneBlog);
  routes.get("/:id",blogDetails.singleBlog);
  routes.put("/edit/:id",blogDetails.updateBlog);


// routes.route("/single/:id").get(blogDetails.oneBlog).patch(validateAllFields(), (req, res) => {
//   const error = validationResult(req); //* field validation request

//   if (!error.isEmpty()) {
//     return res.status(400).json(error.array());
//   }
//   blogDetails.addBlog(req, res)
// })

routes
  .route("/comment")
  .post(auth.verifyUser, validateComments(), (req, res) => {
    const error = validationResult(req); //* field validation request

    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    blogDetails.addBlogComment(req, res);
  })
  routes.get("/comment/:id",blogDetails.allBlogComment);


module.exports = routes;
