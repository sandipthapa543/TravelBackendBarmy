const db = require("../model/index");
const slugify = require("slugify");
//Admin class
class Admin {
  addPackage(req, res) {
    console.log(req.body)
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
              .json({message: "Package added successfully", newpack});
        })
        .catch((err) => res.send(err));
  }

  addActivity(req, res) {
    var newAct = {
      Activity_Name: req.body.name,
      Slug: slugify(req.body.name, {
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
              .json({message: "Activity added successfully", result});
        })
        .catch((err) => res.send(err));
  }

  validateUpdate(req, res, next) {
    !req.body.slug ? new Error("Please provide slug") : req.body.slug;
    next();
  };

  updatePackage(req, res) {
    db.packages.findByPk(req.params.id).then(result => {
      // Check if record exists in db
      if (result) {
        console.log(result.Package_Name)
        result.Package_Name = req.body.Package_Name
        result.update()
            .then(res.send(result)).catch(err => res.send(err))
      }
      // else{
      //   res.send("No package available")
      // }
    })
    // const pack = db.packages.findByPk(req.params.id);

    // console.log(pack)
  }

  updateActivity(req, res, next) {
    db.activities.update(req.body,{where:{id:req.params.id},returning:true, plain: true}).then(result =>{
      res.json(result)
    })

  }

  deleteActivity(req,res,next) {
    db.activities.destroy({ where: {id: req.params.id}}

    ).
    then(function(result) {
      res.json(result)
    })
        .catch(next)
  }

}
module.exports = Admin;
