const db = require("../model/index");

class Package {
  allPackage(req, res) {
    db.packages
      .findAll({ include: db.activities })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  }

  onePackage(req, res) {
    db.packages
      .findByPk(req.params.id)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  updatePackage(req, res, id) {}

  allActivity(req, res) {
    db.activities
      .findAll({include: db.packages})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  }

  singleActivity(req, res) {
    db.activities
      .findOne({ where: { Slug: req.params.slug }, include: db.packages })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));

    //     db.activities
    //     .findAll({ where: { Slug: req.params.slug }})
    //   .then((result) => {
    //     db.packages
    //       .findAll({ where: { activityId: result.id } })
    //       .then((final) => {
    //         res.json({ result, final });
    //       });
    //   })
    //   .catch((err) => res.send(err));
    
  }
}

module.exports = Package;
