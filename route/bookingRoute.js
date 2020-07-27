const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
const auth = require("../middleware/auth");
const bookingController =require("../controller/bookingController");
const bookingDetails = new bookingController();


routes.post("/",bookingDetails.postBooking);

module.exports=routes
