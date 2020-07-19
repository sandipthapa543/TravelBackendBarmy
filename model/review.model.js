module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        reviews: {
            type: Sequelize.Number,
            allowNull: false,
            min: 0,
            max: 5,
            defaultValue: 0,
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