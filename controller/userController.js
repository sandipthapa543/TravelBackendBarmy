const bcrypt = require("bcryptjs");
const db = require("../model/index");

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
}
//* export class Users for Routing API
module.exports = Users;