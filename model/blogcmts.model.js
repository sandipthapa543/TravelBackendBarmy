// module.exports = (sequelize, Sequelize) => {
//   const BlogCmts = sequelize.define("blogcmts", {
//     blog_id: {
//       type: Sequelize.Interger,
//       allowNull: false,
//     },
//     user_id: {
//       type: Sequelize.Interger,
//       allowNull: false,
//     },
//     Comments: {
//       type: Sequelize.TEXT,
//       allowNull: false,
//     },
//   });
//   return BlogCmts;
// };

module.exports = (sequelize, Sequelize) => {
  const BlogComments = sequelize.define("blogcomments", {
    blog_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Comments: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });

  return BlogComments;
};
