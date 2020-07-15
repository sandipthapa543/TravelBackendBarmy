const db = require("../model/index");
const slugify = require("slugify");
//Admin class
class Admin {
  addPackage(req, res) {
    console.log(req.body);
    var pack = {
      Package_Name: req.body.Package_Name,
      Slug: slugify(req.body.Package_Name, {
        lower: true,
      }),
      Days: req.body.Days,
      Price: req.body.Price,
      Includes: req.body.Includes,
      Excludes: req.body.Excludes,
      Itinerary: req.body.Itinerary,
      Difficulty_level: req.body.Difficulty_level,
      Description: req.body.Description,
      Country: req.body.Country,
      Best_season: req.body.Best_season,
      activityId: req.body.activityId,
      Accomodation: req.body.Accomodation,
      Highest_point: req.body.Highest_point,
      Starting_point: req.body.Starting_point,
      Gears_required: req.body.Gears_required,
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
