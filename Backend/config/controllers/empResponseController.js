const sendemail= require('../../utils/email');

const empresponsemodel=require("../../models/employeeResponseModel");
const feedbackmodel=require("../../models/FeedbackModel");


exports.createEmpResponse=async(req,res,next)=>{
    try{
        const{bookingid,Availability}=req.body
        const response=await empresponsemodel.create(
            {
                bookingid,
                Availability
            }

        )
        res.status(200).json({
            success:true,
            response
        })

    }

    catch(error){
            res.status(400).json({
                success:false,
                error
            })
    }
}

exports.getEmpResponse=async(req,res,next)=>{
    try{

        const empresponse=await empresponsemodel.find();
        res.status(200).json({
            success:true,
            empresponse
        })

    }

    catch(error){
        res.status(400).json({
            success:false,
            error


        })
    }
}


exports.sendFeedbackLink=async(req,res,next)=>{


    try{

        const {email,bookid} =req.query;
        console.log("email",email)
        const url=`${process.env.FRONTEND_URL}/feedback/${bookid}`;
   const message=`your Feedback  url is as follows\n\n
   ${url}\n\n If you have not requested this email,then ignore it`;

   sendemail({
    email:email,
    subject:"Feedback link",
    message
 })
 res.status(200).json({
     success:true,
     message:`Email sent to ${email}`
 })
        

    }

    catch(error){
        return res.status(400).json({
            message:'internal server error',
            error
            
        })
    }

}


exports.ReceiveFeedback=async(req,res,next)=>{


    try{

        const {bookid,feedback,rating} =req.query;
        //console.log("email",email)
        const response=await feedbackmodel.create(
            {
                bookid,
                feedback,
                rating
            }

        )
        
 res.status(200).json({
     success:true,
     message:"Received successfully",
     response
 })
        

    }

    catch(error){
        return res.status(400).json({
            message:'internal server error',
            error
            
        })
    }

}

exports.getallfeedback=async(req,res,next)=>{

    try{
        
        const feedbacks=await feedbackmodel.find();
        res.status(200).json({
            success:true,
            feedbacks
        })


    }

    catch(error){
        res.status(400).json({
            success:false,
            error


        })
    }

}

exports.getfeedbackbasedonid=async(req,res,next)=>{

    try{
        const{_id}=req.query;
        const feedbackById=await feedbackmodel.findById(_id);
        res.status(200).json({
            success:true,
            feedbackById
        })


    }

    catch(error){
        res.status(400).json({
            success:false,
            error


        })
    }

}