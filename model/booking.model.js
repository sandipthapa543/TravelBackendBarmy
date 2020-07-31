module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("bookings", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    package_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    People: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Status: {
      type: Sequelize.ENUM,
      defaultValue: "pending",
      values: ["pending", "booked", "cancel"],
    },
    departure_dates: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  return Booking;
};
