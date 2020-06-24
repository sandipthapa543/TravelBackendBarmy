module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        First_Name: {
            type: Sequelize.STRING
        },
        Last_Name: {
            type: Sequelize.STRING
        },
        Email: {
            type: Sequelize.STRING
        },
        Password:{
            type:Sequelize.STRING
        }
    });

    return User;
}