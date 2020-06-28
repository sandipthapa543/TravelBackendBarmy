const db = require("../model/index");
const slugify = require("slugify");
//Package class
class Packages {
  addPackage(req, res) {
    var pack = {
      Package_Name: req.body.name,
      Slug: slugify(req.body.name, {
        lower: true
      }),
      Days: req.body.days,
      Price: req.body.price,
      Includes: req.body.includes,
      Excludes: req.body.excludes,
      Itinerary: req.body.itinerary,
      Difficulty_level: req.body.difficulty_level,
      Description: req.body.description,
      Country: req.body.country,
      Best_season: req.body.best_season,
      Activity_id: req.body.activity_id,
      Accomodation: req.body.accomodation,
      Highest_point: req.body.highest_point,
      Starting_point: req.body.starting_point,
      Gears_required: req.body.gears_required,
      Image: req.file.filename,
    };
    db.packages.create(pack)
    .then(newpack => {
      res
        .status(201)
        .json({ message: "Package added successfully", newpack });
    })
    .catch((err) => res.send(err));
  }
}
module.exports = Packages;
