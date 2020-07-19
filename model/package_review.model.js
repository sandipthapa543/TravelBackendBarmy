module.exports = (sequelize, Sequelize) => {
  const PackageReview = sequelize.define("package_review", {
    package_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Contents: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return PackageReview;
};
