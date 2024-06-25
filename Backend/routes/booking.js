
const express=require('express');
const {isAuthenticatedUser, authorizeRoles, isAuthenticatedEmployee}=require('../middlewares/authenticate')
const {newBooking,getSingleBooking,getLoggedInUserOrders,getAllBookings,updatebooking, deletebooking, getEmployeeUserOrders}=require('../../Backend/config/controllers/bookingController');


const router=express.Router();

router.route('/book/new').post(isAuthenticatedUser,newBooking);
router.route('/book/singlebooking/:id').get(isAuthenticatedUser,getSingleBooking);
router.route('/book/allsingleuserbookings').get(isAuthenticatedUser,getLoggedInUserOrders);

router.route('/book/allorders/employee').get(isAuthenticatedEmployee,getEmployeeUserOrders);


//admin routes
router.route('/admin/bookings').get(isAuthenticatedUser,authorizeRoles('admin'),getAllBookings);
router.route('/admin/bookings/update/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updatebooking);
router.route('/admin/bookings/deletebooking/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deletebooking);

module.exports=router;