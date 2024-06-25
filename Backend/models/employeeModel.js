
/*const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"enter the name "],
        trim:true
    },
    age:Number,
    star_rating:{
        type:Number, 
        default:0 , //getting average from rating field in reviews
        required:true
       
    },
    images:[
        {
        Filename:{
            type:String,
            required:true
            
}

        }

    ],
    review:[
        {
            type:String,
            comment:String,
            default:0


        }
    ],
    reviews:[
        {
            user:mongoose.SchemaTypes.ObjectId
            ,
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }

        }
    ],
    numofreviews:{
        type:Number,
        default:0
    },
    experience:{
        type:String,
        required:[true,"enter experience"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId
    }   ,
    companiesworked:[
        {
            type:String,
            default:"nil"
        }
    ],
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    workingHour:{
        type:String
       
    },
    specialist:String,
    serviceCharge:{
        type:Number,
        required:[true,"please enter service charge"]
    },
    accept:String,
    arrivingTime:String,
    arrivingDate:String,
    category:{
        type:String,
        
        enum:{
            values:[
                "electronic gadgets",
                "plumbing",
                "electrical wiring",
                " computer issues",
                "furniture",
                "automobiles",
                "counselling"
            ],
            message:"enter according to category"



        }
        
    },
    service_type:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:"123"
    }

    


    })

    
employeeSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

    const model=mongoose.model("Employee",employeeSchema);
    module.exports=model;


*/



const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"enter the name "],
        trim:true
    },
    age:Number,
   
    images:[
        {
        Filename:{
            type:String,
            required:true
            
}

        }

    ],
   
   
    
    experience:{
        type:Number,
        required:[true,"enter experience"]
    },
    user:{
        //type:mongoose.Schema.Types.ObjectId
        type:String
    }   ,
   
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    workingHour:{
        type:Array
       
    },
    
    serviceCharge:{
        type:Number,
        required:[true,"please enter service charge"]
    },
    
    
    service_type:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:"123"
    },

    working:{
        type:{},
        default:{}
    }

    


    })

    
employeeSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

    const model=mongoose.model("Employee",employeeSchema);
    module.exports=model;




