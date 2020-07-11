const db = require("../model/index");

class Package {
  allPackage(req, res) {
    db.packages
      .findAll({
        offset: req.query.skip,
        limit: req.query.limit,
        order: [[req.query.sort, req.query.order]],
        include: db.activities,
      })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  }

  onePackage(req, res) {
    db.packages
      .findOne({ where: { Slug: req.params.slug }, include: db.activities })
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  }

  allActivity(req, res) {
    db.activities
      .findAll({ limit: req.query.limit, include: db.packages })
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
  }
}

module.exports = Package;
