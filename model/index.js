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

db.activities.hasMany(db.packages, {foreignKey: 'activityId'});
db.packages.belongsTo(db.activities, {foreignKey: 'activityId'},{onDelete:'cascade'});

db.users.hasMany(db.blogs, {foreignKey: 'user_id'});
db.blogs.belongsTo(db.users, {foreignKey: 'user_id'});
module.exports = db;
