const express=require('express');
const { registeruser, loginuser, logoutuser, forgotpassword, resetPassword, getUserProfile, changePassword, updateProfile, adminGetAllUsers, adminGetSingleUser, adminUpdateUser, adminDeleteUser, loginemployee, logoutEmployee, SendNotification } = require('../config/controllers/authController');
const router=express.Router();
const {isAuthenticatedUser}=require('../middlewares/authenticate');
const {authorizeRoles} =require('../middlewares/authenticate');
const {isAuthenticatedEmployee} =require('../middlewares/authenticate')

router.route('/register').post(registeruser);
router.route('/login').post(loginuser);
router.route('/logout').get(logoutuser);
router.route('/password/forgot').post(forgotpassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/userprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/changepassword').put(isAuthenticatedUser,changePassword);
router.route('/updateprofile').put(isAuthenticatedUser,updateProfile);

//emp routes
router.route('/login/employee').post(loginemployee);
router.route('/logout/employee').get(logoutEmployee);



//Admin routes
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),adminGetAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),adminGetSingleUser);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'),adminUpdateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),adminDeleteUser);
router.route('/admin/sendNotification').post(isAuthenticatedUser,authorizeRoles('admin'),SendNotification);
module.exports=router;