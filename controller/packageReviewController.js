const db = require("../model/index");
class PackageReview {
  addPackageReview(req, res) {
    var packreview = {
      package_id: req.body.package_id,
      Rating: req.body.rating,
      Contents: req.body.contents,
      user_id: req.user.id,
    };
    db.packagereview
      .create(packreview)
      .then((review) => {
        res
          .status(201)
          .json({ message: "Package review added successfully", review });
      })
      .catch((err) => res.send(err));
  }

  allPackageReview(req, res) {
    db.packagereview
      .findAll()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.send(err));
  }
}
module.exports = PackageReview;
