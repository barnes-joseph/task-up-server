const db_config = require("../config/db_config");

const { Sequelize, DataTypes } = require("sequelize");

// creating a database connection with sequelize
// creating an instance of sequelize with database
const sequelize = new Sequelize(
  db_config.DB,
  db_config.USER,
  db_config.PASSWORD,
  {
    host: db_config.HOST,
    dialect: db_config.dialect,
    operatorsAliases: false,
    pool: {
      max: db_config.pool.max,
      min: db_config.pool.min,
      acquire: db_config.pool.acquire,
      idle: db_config.pool.idle,
    },
  }
);

// connecting sequelize instance to database
 sequelize.authenticate()
 .then(()=>{
    console.log(`Connected to database`);
 })
 .catch(err=>console.log(`Error ${err}`))
 

// creating database object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// creating tables

// Tasklist table
db.tasklists = require("./tasklist_model")(sequelize, DataTypes);

// Tasks table
db.tasks = require("./task_model")(sequelize, DataTypes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`Database re-synced`);
  })
  .catch((err) => console.log(err));

module.exports = db;
