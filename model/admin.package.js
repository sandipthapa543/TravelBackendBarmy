module.exports = (sequelize, Sequelize) => {
  const Package = sequelize.define("package", {
    Package_Name: { type: Sequelize.STRING, allowNull: false },
    Days: { type: Sequelize.STRING, allowNull: false },
    Price: { type: Sequelize.STRING, allowNull: false },
    Includes: { type: Sequelize.STRING, allowNull: false },
    Excludes: { type: Sequelize.STRING, allowNull: false },
    Itinerary: { type: Sequelize.STRING, allowNull: false },
    Image: { type: Sequelize.STRING, allowNull: false },
    Difficulty_level: { type: Sequelize.STRING, allowNull: false },
    Description: { type: Sequelize.STRING, allowNull: false },
    Country: { type: Sequelize.STRING, allowNull: false },
    Best_season: { type: Sequelize.STRING, allowNull: false },
    Activity_id: { type: Sequelize.STRING, allowNull: false },
    Accomodation: { type: Sequelize.STRING, allowNull: false },
    Highest_point: { type: Sequelize.STRING, allowNull: false },
    Starting_point: { type: Sequelize.STRING, allowNull: false },
    Gears_required: { type: Sequelize.STRING, allowNull: false },
  });
  return Package;
};
