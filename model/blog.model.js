module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blog", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Slug: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
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
      allowNull: true,
    },
  });

  return Blog;
};
