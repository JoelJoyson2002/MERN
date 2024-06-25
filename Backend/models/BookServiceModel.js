const mongoose=require('mongoose');

const bookServiceSchema=new mongoose.Schema({

    booktheprovider:[{
        name:{
            type:String,
            //required:true
        },
        image:{
            type:String,
            //required:true
        },
        employee:{
            type:mongoose.SchemaTypes.ObjectId,
            //requird:true,
            ref:"Employee"
        },
        age:{
            type:Number
        },
        experience: {
            type:Number
        },

        contact:{
            type:String
        },
        email:{
            type:String
        },
        location:{
            type:String
        },
        serviceCharge:{
            type:String
        },
        service_type:{
            type:String
        },

        images:[
            {
            Filename:{
                type:String,
                required:true
                
    }
    
            }
    
        ],

        working:{
            type:{}
        }
        


   }

],
paymentInfo:{
    id:{
           type:String,
         
    },
    status:{
        type:String,
      
    }
},
serviceCharge:{
    type:Number,
   // required:true,
    //default:0.0

},


    shippingInfo:{
        address:{
            type:String,
            //required:true
        },
        country:{
            type:String,
            //required:true
        },
        city:{
            type:String,
            //required:true
        },
        phone:{
            type:Number,
            //required:true
        },
        postalcode:{
            type:String
        }
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        //required:true,
        ref:'user'
    },
   

    
    paidAt:{
        type:Date
    },
    servicearrivedat:{
         type:Date

    },
    bookingstatus:{
        type:String,
       
        default:"processing"
    },
    bookedat:{
        type:Date,
        default:Date.now
    },
    service_type:{
        type:String,
        default:"plumbing"

    },
    timeslot:{
        type:String,
        default:"27"
        
    },
    Dates:{
        type:String,
    }
   

})

const bookingModel=mongoose.model('bookingModel',bookServiceSchema);

module.exports=bookingModel;