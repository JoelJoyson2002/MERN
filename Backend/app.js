const path=require('path');
const dotenv=require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")})


const express=require('express')
const cookieParser=require('cookie-parser')
const app=express()
const body=require('body-parser');
app.use(cookieParser());
const routes=require('./routes/employee')
const auth=require('./routes/auth')
const booking=require('./routes/booking');
const payment=require('./routes/payment');
const getUser=require('./routes/getUser');
const createempresponse=require('./routes/employeeResponse')

app.use(express.json());
app.use(body.json());

app.use('/api/v1/',routes);
app.use('/api/v1/',auth);
app.use('/api/v1/',booking);
app.use('/api/v1/',payment);

app.use('/api/v1',getUser);

app.use('/api/v1/',createempresponse);


module.exports=app;




