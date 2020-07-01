const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const userRoute = require("./route/userRoute");
require("dotenv").config();

const app = express();
const adminRoute = require("./route/adminRoute");
const packageRoute = require("./route/packageRoute");
const blogRoute = require("./route/blogRoute");

const db = require("./model");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.use(bodyParser.json());

app.use(morgan("dev"));

// app.use(morgan("combined"));

app.use(express.static(`${__dirname}/public`));
app.use(cors({ origin: "*" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Travel Application." });
});

app.use("/user", userRoute);

app.use("/admin", adminRoute);
app.use("/package", packageRoute);
app.use("/ublog", blogRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
