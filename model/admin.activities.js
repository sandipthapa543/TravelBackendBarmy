module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    Activity_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Contents: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Activity;
};
