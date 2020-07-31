const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
const auth = require("../middleware/auth");
const bookingController =require("../controller/bookingController");
const bookingDetails = new bookingController();


routes.post("/",auth.verifyUser,bookingDetails.postBooking);
routes.get("/",bookingDetails.getALL);
routes.patch("/:id",bookingDetails.updateStatus);

module.exports=routes
