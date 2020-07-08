module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    First_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Last_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    Country: {
        type: Sequelize.STRING,
        allowNull: false  
    },
    City: {
      type: Sequelize.STRING,
        allowNull: false  
    },
    Contact_No: {
      type: Sequelize.STRING,
        allowNull: false  
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    IsAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return User;
};