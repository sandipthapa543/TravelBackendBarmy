module.exports = (sequelize, Sequelize) => {
  const Package = sequelize.define("package", {
    Package_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Slug: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    Days: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Includes: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Excludes: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Itinerary: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Image: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Difficulty_level: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Best_season: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Activity_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Accomodation: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Highest_point: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Starting_point: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Gears_required: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Package;
};
