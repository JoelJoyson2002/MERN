const express=require('express');
const { getUser } = require('../config/controllers/getuserController');
const { isAuthenticatedEmployee } = require('../middlewares/authenticate');

const router=express.Router();


router.route('/getUser/:userid').get(isAuthenticatedEmployee,getUser);




module.exports=router;