module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Activity_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Slug: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    Contents: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Image: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Activity;
};
