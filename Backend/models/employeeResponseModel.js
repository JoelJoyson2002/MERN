

const mongoose=require('mongoose');

const empresponseSchema=new mongoose.Schema({

    bookingid:{
        type:mongoose.Schema.Types.ObjectId
    },
    Availability:{
        type:String,
        
    }
})


const empresponsemodel=mongoose.model("empresmodel",empresponseSchema,"EmpResponseModel");
module.exports=empresponsemodel;

