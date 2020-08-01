const db = require("../model/index");
const Op = db.Sequelize.Op;
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

  addPackageReview(req, res) {
    var packreview = {
      package_id: req.params.id,
      rating: req.body.rating,
      review: req.body.review,
      user_id: req.user.id,
    };
    db.review
      .create(packreview)
      .then((review) => {
        res
          .status(201)
          .json({ message: "Package review added successfully", review });
      })
      .catch((err) => res.send(err));
  }

  async allPackageReview(req, res) {
    const data = await db.review.findOne({
      where: { package_id: req.params.id },
      attributes: [
        [db.Sequelize.fn("count", db.Sequelize.col("rating")), "count"],
        [db.Sequelize.fn("avg", db.Sequelize.col("rating")), "average"],
      ],
    });

    const total = Number(data.dataValues.count);
    const avg = Number(data.dataValues.average);

    db.review
      .findAll({
        where: { package_id: req.params.id },
        include: { model: db.users, attributes: ["First_Name", "Last_Name"] },
      })
      .then((result) =>
        res.status(200).send({ total: total, average: avg, reviews: result })
      )
      .catch((err) => res.send(err));
  }

  reviewStats(req, res) {
    db.review
      .findAll({
        attributes: [
          "package_id",
          [db.Sequelize.fn("avg", db.Sequelize.col("rating")), "average"],
        ],
        group: ["review.package_id"],
      })
      .then((result) => {
        for (let index = 0; index < result.length; index++) {
          result[index].dataValues.average = Number(
            result[index].dataValues.average
          );
        }
        res.status(200).send(result);
      }).catch(err=>res.send(err));
  }
  allReviews(req, res) {
    db.review.findAll({
      limit: req.query.limit,
      include: [
        {model: db.users, attributes: ['First_Name','Last_Name','Country','City']},
        {model: db.packages, attributes: ['Package_Name','Slug']}
      ],
      attributes: {exclude: ['id','user_id','package_id','createdAt']}
    })
    .then((result) => {
      res.status(200).send(result);
    }).catch(err=>res.send(err));
  }
}
module.exports = Package;
