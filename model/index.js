require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://postgres:postgres@localhost/travel",{

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

