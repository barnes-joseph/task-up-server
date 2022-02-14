require('dotenv').config();

module.exports = {
    HOST:process.env.DATABASE_URL,
    USER:process.env.USER,
    DB:process.env.DB,
    PASSWORD:process.env.PASSWORD,
    dialect:process.env.dialect,
    
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}