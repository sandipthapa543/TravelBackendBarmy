const db = require("../model/index");
const slugify = require("slugify");
//Admin class
class Admin {
  addPackage(req, res) {
    var pack = {
      Package_Name: req.body.name,
      Slug: slugify(req.body.name, {
        lower: true,
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
    db.packages
      .create(pack)
      .then((newpack) => {
        res
          .status(201)
          .json({ message: "Package added successfully", newpack });
      })
      .catch((err) => res.send(err));
  }

  addActivity(req, res) {
    var newAct = {
      Activity_Name: req.body.name,
      Slug: slugify(req.body.slug, {
        lower: true,
      }),
      Contents: req.body.description,
      Image: req.file.filename,
    };

    db.activities
      .create(newAct)
      .then((result) => {
        res
          .status(201)
          .json({ message: "Activity added successfully", result });
      })
      .catch((err) => res.send(err));
  }
}
module.exports = Admin;
