const app=require('./app');

const path=require('path');
//const dotenv=require('dotenv');
const connect_databse = require('./config/database');

//dotenv.config({path:path.join(__dirname,"config/config.env")})
//dotenv.config({path:'backend/config/config.env'});
connect_databse();

app.listen(process.env.PORT,()=>{
    console.log(`listening at ${process.env.PORT}  in ${process.env.NODE_ENV}` )
})
