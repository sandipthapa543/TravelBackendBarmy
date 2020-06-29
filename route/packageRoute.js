const express = require("express");
const routes = express.Router();
const packageController = require("../controller/packageController");

const package = new packageController();

routes.get('/show', package.allPackage)
routes.get('/activity/:slug', package.singleActivity)
routes.get('/activity', package.allActivity)

module.exports = routes