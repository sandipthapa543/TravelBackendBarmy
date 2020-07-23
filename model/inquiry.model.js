module.exports = (sequelize, Sequelize) => {
    const Inquiry = sequelize.define("inquiry", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      package_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      People: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Status:{
        type:   Sequelize.ENUM,
        defaultValue:'unread',
        values: ['unread', 'read', 'deleted']
      }
    });
    return Inquiry;
  };
  