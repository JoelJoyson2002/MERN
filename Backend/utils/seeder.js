

const data=require('../data/employee.json');
const database=require('../config/database');
const connect_databse = require('../config/database');

const path=require('path')
const dotenv=require("dotenv");
const model=require("../models/employeeModel");

dotenv.config({path:'backend/config/config.env'});
//dotenv.config({path:path.join(__dirname,"config/config.env")})
connect_databse();

const seeding=async()=>{

    try{
   await model.deleteMany(); 
   console.log("deleted pevious data");
   await model.insertMany(data);
    console.log("inserted");
    }
    catch(e){
        console.log(e);
    }
    process.exit();
}

seeding();










