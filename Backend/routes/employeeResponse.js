

const express=require('express');
const { isAuthenticatedEmployee, isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const { createEmpResponse, getEmpResponse, sendFeedbackLink, ReceiveFeedback, getallfeedback, getfeedbackbasedonid } = require('../config/controllers/empResponseController');
const router=express.Router();


router.route('/empresponse').post(isAuthenticatedEmployee,createEmpResponse);

router.route('/admin/getempresponse').get(isAuthenticatedUser,authorizeRoles('admin'),getEmpResponse);

router.route('/sendemailfeedback').get(sendFeedbackLink);
router.route('/receivefeedback').post(ReceiveFeedback);
router.route('/admin/getfeedbacks').get(isAuthenticatedUser,authorizeRoles('admin'),getallfeedback);
router.route('/admin/feedbackbyid').get(isAuthenticatedUser,authorizeRoles('admin'),getfeedbackbasedonid)



module.exports=router;