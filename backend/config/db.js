const Pool=require("pg").Pool;
require("dotenv").config();

const pool=new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    ssl:{
        rejectUnauthorized:false

});

pool.connect().then(()=>console.log("Postgresql is connected")).catch((error)=>console.log("database connection failed",error.message));

module.exports=pool;

