

const mongoose=require('mongoose');

const FeedbackSchema=new mongoose.Schema({

    bookid:{
        type:String
    },
    feedback:{
        type:String
    },
    rating:{
        type:Number
    }
    
})


const feedbackmodel=mongoose.model("feedbackmodel",FeedbackSchema,"FeedBackModel");
module.exports=feedbackmodel;

