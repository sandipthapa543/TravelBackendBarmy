require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.UNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB}`,{

    dialect:'postgres',

    pool:{
        max:5,
        min:0,
        acquire:3000,
        idle:10000
    }
});

const db={}

 db.Sequelize=Sequelize;
 db.sequelize=sequelize;
 db.users=  require("./user.model.js")(sequelize,Sequelize);

 module.exports = db;