const bcrypt = require("bcryptjs");
const db = require("../model/index");
const jwt = require('jsonwebtoken');
require("dotenv").config();

class Users {
  //* Sign Up API users Post request and response
  // eslint-disable-next-line class-methods-use-this
  registerUser(req, res) {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        res.status(400).send({ Status: "Failure", message: err });
        return;
      }
      var userData = {
        First_Name: req.body.first_name,
        Last_Name: req.body.last_name,
        Email: req.body.email,
        Password: hash, //* password security hash function
        Country: req.body.country,
        City: req.body.city,
        Contact_No: req.body.contact,
      };
      db.users
        .create(userData)
        .then((user) => {
          res.status(201).json({ message: "User registered", user });
        })
        .catch((err) => res.send(err));
    });
  }

//* login api with jsonwebtoken users Post request and response
  // eslint-disable-next-line class-methods-use-this
  logIn(req, res) {
    const userValidation = {
      email: req.body.email,
      password: req.body.password,
    };

    //* verify user attempt to login
    // eslint-disable-next-line consistent-return
    db.users.findOne({ where: { Email: userValidation.email }}).then(result => {
      // console.log(result)
      if (result === null) {
        res.status(400).json({
          success: false,
          message: "Email does not exist.",
        });
        return
      }
        console.log("Entered");
        bcrypt.compare(
          userValidation.password,
          result.Password).then(response => {
            if (response) {
              const token = jwt.sign({ id: result.id, email: result.Email }, process.env.SECRET, {
                expiresIn: "7d",
              });
              res.status(200).json({
                status: "Login success!",
                token,
                result,
              });
            } else {
              res.status(400).json({
                success: false,
                message: "Invalid Password.",
              });
            }
          }
        ).catch(err=>console.log(err))
    });
  }
  
  userMe(req,res){
    try {
      res.status(200).json(req.user);
    } catch (err) {
      res.status(400).json({
        status: "Failure",
        message: err
      });
    }
  }
}
//* export class Users for Routing API
module.exports = Users;