module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blog", {
    Title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Contents: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Image: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Likes: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  return Blog;
};
