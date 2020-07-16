require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  `postgres://${process.env.UNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB}`,
  {
    logging: false,
    dialect: "postgres",

    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);

db.packages = require("./package.model.js")(sequelize, Sequelize);
db.activities = require("./activities.model.js")(sequelize, Sequelize);
db.blogs = require("./blog.model")(sequelize, Sequelize);

db.inquiries = require("./inquiry.model")(sequelize, Sequelize);
db.blogcomment = require("./blogcmts.model")(sequelize, Sequelize);

// 1 activity has many packages but 1 package belongs to single activity so 1-many relationship.
db.activities.hasMany(db.packages, {foreignKey: 'activityId',onDelete: 'CASCADE', hooks:true});
db.packages.belongsTo(db.activities, {foreignKey: 'activityId'});

db.users.hasMany(db.blogs, {foreignKey: 'user_id',onDelete: 'CASCADE', hooks:true});
db.blogs.belongsTo(db.users, {foreignKey: 'user_id'});

db.users.hasMany(db.inquiries, {foreignKey: 'user_id',onDelete: 'CASCADE', hooks:true})
db.inquiries.belongsTo(db.users, {foreignKey: 'user_id'})

db.packages.hasMany(db.inquiries, {foreignKey: 'package_id',onDelete: 'CASCADE', hooks:true})
db.inquiries.belongsTo(db.packages, {foreignKey: 'package_id'})

db.users.hasMany(db.blogcomment, {foreignKey: 'user_id',onDelete: 'CASCADE', hooks:true})
db.blogcomment.belongsTo(db.users, {foreignKey: 'user_id'})

db.packages.hasMany(db.blogcomment, {foreignKey: 'blog_id',onDelete: 'CASCADE', hooks:true})
db.blogcomment.belongsTo(db.packages, {foreignKey: 'blog_id'})

module.exports = db;
