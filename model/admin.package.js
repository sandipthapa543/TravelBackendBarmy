module.exports = (sequelize, Sequelize) => {
  const Package = sequelize.define("package", {
    Package_Name: { type: Sequelize.STRING },
    Days: { type: Sequelize.STRING },
    Price: { type: Sequelize.STRING },
    Includes: { type: Sequelize.STRING },
    Excludes: { type: Sequelize.STRING },
    Itinerary: { type: Sequelize.STRING },
    Difficulty_level: { type: Sequelize.STRING },
    Description: { type: Sequelize.STRING },
    Country: { type: Sequelize.STRING },
    Best_season: { type: Sequelize.STRING },
    Activity_id: { type: Sequelize.STRING },
    Accomodation: { type: Sequelize.STRING },
    Highest_point: { type: Sequelize.STRING },
    Starting_point: { type: Sequelize.STRING },
    Gears_required: { type: Sequelize.STRING },
  });
  return Package;
};
