const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"enter name"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"enter email"],
        validate:[validator.isEmail,'Please enter valid email']

    },
    password:{
        type:String,
        required:[true,"enter password"],
        maxlength:[6,"password must be only 6 characters"],
        select:false
    },
    avatar:{
        type:String
        
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordTokenExpire:{
        type:Date,
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    Phone:{
        type:Number,
        default:7653334512
    }
})

/*userSchema.pre('save',async function(next){
      this.password=await bcrypt.hash(this.password,10);
})*/

userSchema.pre('save', async function (next) {
    // Only hash the password if it is being modified or is new
    if (!this.isModified('password')) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  

userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword=async function(enteredpassword){
      
    return await bcrypt.compare(enteredpassword,this.password)
}

userSchema.methods.getResetToken=function(){
    //generate token
    const token=crypto.randomBytes(20).toString('hex');

    //generate hash and set to resetpasswordtoken

    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');

    //set expiry

    this.resetPasswordTokenExpire=Date.now()+30*60*1000;
    //extra
    
    return token;
}



const usermodel=mongoose.model("user",userSchema);
module.exports=usermodel;