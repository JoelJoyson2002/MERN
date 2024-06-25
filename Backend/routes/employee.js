
const express=require("express");
const { getEmployee, createEmployee, getEmployeeById, employeeUpdate, employeedelete, createReview, getReview, deleteReview, getAdminEmployees, extractEmployee, ChangeDate } = require("../config/controllers/employeecontroller");

const router=express.Router();
const {isAuthenticatedUser,authorizeRoles}=require("../middlewares/authenticate")
const multer=require('multer');
const path=require('path');

const upload=multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
       // cb(null,path.join(__dirname,'..','public/images'))
        //cb(null,path.join('E:\MERN STACK\FINAL YEAR PROJECT\Domestic Service Providing System-1\Frontend\','..','public\images'))
        const imagePath = path.resolve('E:\\MERN STACK\\FINAL YEAR PROJECT\\Domestic Service Providing System-1\\Frontend\\public\\images');
        
// Or use forward slashes (which work on most platforms)
// const imagePath = path.resolve('E:/MERN STACK/FINAL YEAR PROJECT/Domestic Service Providing System-1/Frontend/', '..', 'public', 'images');

cb(null, imagePath);
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})


router.route('/emp').get(getEmployee);

router.route('/admin/emp/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),createEmployee);

router.route('/admin/emps').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminEmployees);
router.route('/admin/emp/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),employeedelete);
router.route('/admin/emp/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),employeeUpdate);
router.route('/admin/getReview/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getReview)
router.route('/admin/deleteReview/:id/:reviewId').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview)
router.route('/admin/createReview').put(isAuthenticatedUser,createReview);



router.route('/emp/empid/:id').get(getEmployeeById);
//router.route('/emp/empid/:id').put(employeeUpdate);
//router.route('/emp/empid/:id').delete(employeedelete);

/*
router.route('/review').put(isAuthenticatedUser,createReview);
router.route('/getReview/:id').get(isAuthenticatedUser,getReview);
router.route('/deleteReview/:id/:reviewId').delete(isAuthenticatedUser,deleteReview);*/


router.route('/extractemp').get(isAuthenticatedUser,extractEmployee);
router.route('/changedate').put(isAuthenticatedUser,ChangeDate);

module.exports=router;