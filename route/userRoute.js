const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
const auth = require('../middleware/auth')
const { check, validationResult } = require("express-validator");
// const checkToken = require('../middleware/auth');
//* import userController file from controller package
const userController = require("../controller/userController");

const userDetails = new userController();

const validateAllFields = () => [
  //* name valaidation
  check("first_name")
    .notEmpty()
    .withMessage("Please enter your first Name")
    .isAlpha()
    .withMessage("Name must contain alphabets")
    .isLength({ min: 3 })
    .withMessage("Name must contain atleast 3 alphabets"),

  //* last name validation
  check("last_name")
    .notEmpty()
    .withMessage("Please enter your last name")
    .isAlpha()
    .withMessage("Last Name must contain alphabets")
    .isLength({ min: 2 })
    .withMessage("Last Name must contain atleast 2 alphabets"),

  //* email validation
  check("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Please enter the valid Email"),

  //* password validation
  check("password")
    .notEmpty()
    .withMessage("Required Password")
    .isLength({ min: 7 })
    .withMessage(
      "Password should not be empty, minimum eigh characters, at least one letter, one number and one special character"
    ),

  //* confirm password validation
  // check('Confirm_Password')
  // .custom(Confirm_Password =>{
  //  if(Password !== Confirm_Password){
  //         throw new Error('Password do not match with confirm password')
  //     }
  // }),

  //* phone no validation
  check("country").notEmpty().withMessage("Required country name"),
];

//* post  form api router
// eslint-disable-next-line consistent-return
routes.post("/register", validateAllFields(), (req, res) => {
  const error = validationResult(req); //* field validation request

  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  }
  userDetails.registerUser(req, res);
});

routes.post("/login", (req, res) => {
  userDetails.logIn(req, res);
});

routes.get("/me",auth.verifyUser,userDetails.userMe);
module.exports = routes;
