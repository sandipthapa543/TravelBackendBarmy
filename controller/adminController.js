const db = require("../model/index");
const slugify = require("slugify");
//Admin class
class Admin {
  addPackage(req, res) {
    console.log(req.body);
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
      activityId: req.body.activity_id,
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
      Activity_Name: req.body.Activity_Name,
      Slug: slugify(req.body.Activity_Name, {
        lower: true,
      }),
      Contents: req.body.Contents,
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

  validateUpdate(req, res, next) {
    !req.body.slug ? new Error("Please provide slug") : req.body.slug;
    next();
  }

  updatePackage(req, res) {
    db.packages.update(req.body,{where:{id:req.params.id},returning:true, plain: true},{ include: db.activities }).then(result =>{
      res.json(result)
    })
  }

  deletePackages(req,res){
    db.packages.destroy({where:{id:req.params.id}}).then(result =>{
      res.json(result)
    })
  }

  updateActivity(req, res, next) {
    db.activities
      .findByPk(req.params.id)
      .then((result) => {
        if (result) {
          result
            .update(req.body)
            .then((act) => res.send(act))
            .catch((err) => res.send(err));
        }
      })
      .catch((err) => res.send(err));
  }

  deleteActivity(req, res, next) {
    db.activities
      .destroy({ where: { id: req.params.id } })
      .then(function (result) {
        res.json(result);
      })
      .catch(next);
  }
}
module.exports = Admin;
