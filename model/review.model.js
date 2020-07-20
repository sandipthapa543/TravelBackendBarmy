module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            min: 0,
            max: 5,
            defaultValue: 0,
        },
        review: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        package_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
    return Review;
};