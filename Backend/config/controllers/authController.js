const usermodel=require('../../models/userModel');
const employeemodel=require('../../models/employeeModel')



const sendemail= require('../../utils/email');
const crypto=require('crypto');
exports.registeruser=async(req,res,next)=>{

   
      
    try {
        const { name, email, password} = req.body;
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
             success: false,
              message: "Email is already in use"
      });
    }
    
        const user = await usermodel.create({
          name,
          email,
          password
          
        });

        const token=user.getJwtToken();
        //setting cookies

        const options={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
            httpOnly:true
        }
    
        res.status(201)
        .cookie('token',token,options)
        .json({
          success: true,
          user,
          token
        });
      } catch (error) {
        if (error.name == "ValidationError") {
          const errorMessages = Object.values(error.errors).map((value) => value.message);
          res.status(400).json({
            success: false,
            message: errorMessages
          });
        } else {
          res.status(500).json({
            success: false,
            message: "Internal Server Error"
          });
        }
      }



}

exports.loginuser=async(req,res,next)=>{
     const{email,password}=req.body;
     if(!email || !password){
         return res.status(404).json({
            success:false,
            message:"Enter email and password"
         })
     }
     try{
        const user=await usermodel.findOne({email}).select('+password');
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        if(!await user.isValidPassword(password)){
            
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        
        const token=user.getJwtToken();
        //setting cookies

        const options={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
            httpOnly:true
        }

        return res.status(201)
        .cookie('token',token,options)
        
        .json({
            success:true,
            message:"WElcome",
            user,
            token
            
        })

     }
     catch(error){
         if(error.name=="CastError"){
            res.status(400).json({
                success:false,
                message:"enter correct email and password"
            })
         }
         else{
            res.status(500).json({
                success:false,
                message:"internal server error"
            })
         }
     }
}

exports.loginemployee=async(req,res,next)=>{
  try{
     const{email,password}=req.body
       const employee=await employeemodel.findOne({email});
       
       if(employee){
           if(employee.password===password){
            
        const token=employee.getJwtToken();
        //setting cookies

        const options={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
            httpOnly:true
        }

        return res.status(201)
        .cookie('employeetoken',token,options)
        
        .json({
            success:true,
            message:"WElcome",
           employee,
            token
            
        })

               
           }
           else{
                 res.status(400).json({
                     message:"Enter correct password"
                 })
           }
       }
       else{
           res.status(400).json({
                 message:"email not found"
           })
       }

      }
      catch(error){
        res.status(500).json({
          message:"Internal server error"
        })
      }
      
}


exports.logoutEmployee=(req,res,next)=>{

  

  
  res.cookie("employeetoken",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })

  
  .status(201)
  .json({
    success:true,
    message:"you have been logged out"
  })
  
}

exports.logoutuser=(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })
  .status(201)
  .json({
    success:true,
    message:"you have been logged out"
  })
  
}

exports.forgotpassword=async(req,res,next)=>{
   const user= await usermodel.findOne({email:req.body.email})
   if(!user){
       return res.status(404).json({
          message:'user not found with this email'
       })
   }
   //generate reset token
   const resetToken=user.getResetToken();
    await user.save({validateBeforeSave:false});

   //create reset url
   const reseturl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
   const message=`your password reset url is as follows\n\n
   ${reseturl}\n\n If you have not requested this email,then ignore it`

   try{
      //for sending email
      sendemail({
         email:user.email,
         subject:"password recovery",
         message
      })
      res.status(200).json({
          success:true,
          message:`Email sent to ${user.email}`
      })

        
   }
   catch(error){
     user.resetPasswordToken=undefined;
     user.resetPasswordTokenExpire=undefined;
     await user.save({validateBeforeSave:false});
     console.log(error);
     return res.status(400).json({
         message:'internal server error'
         
     })
   }

}

exports.SendNotification=async(req,res,next)=>{

  const{email,approval,id}=req.query;

             try{
                sendemail({
                   email:email,
                   subject:"Regarding Booking of Service",
                   message:`Your Booking ${id} is ${approval}`
                })
                res.status(200).json({
                  success: true,
                  message: "Notification sent successfully"
              });
             }
             catch(error){
                 res.status(500).json({
                    success:false,
                    message:"enter correct email"
                 })
             }
}

exports.resetPassword=async(req,res,next)=>{
     
      const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')
      console.log("Reset Password Token:", resetPasswordToken);
      console.log("Query:", {
        resetPasswordToken,
        resetPasswordTokenExpire: {
          $gt: new Date(Date.now())
        }
      });
      
      const user=await usermodel.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
           $gt:Date.now()
        }
      
      })
      console.log("user"+user);

      if(!user){
        return res.status(400).json({
           message:'password reset token is invalid or expired'
        })
      }
      if(req.body.password!==req.body.confirmPassword){
           return res.status(400).json({
              message:"Password does not match"
           })
      }

      user.password=req.body.password;
      user.resetPasswordToken=undefined;
      user.resetPasswordTokenExpire=undefined;
      await user.save({validateBeforeSave:false});
      const token=user.getJwtToken();
      const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }
      res.status(201)
        .cookie('token',token,options)
        .json({
          success: true,
          user,
          token
        });


}

//getting user profile

exports.getUserProfile=async (req,res,next)=>{
  try{
      const user=await usermodel.findById(req.user.id);
      //console.log(user);
      res.status(200).json({
        success:true,
        user
      })


  }
  catch(error){
     res.status(400).json({
       success:false,
       message:"please log in first"

     })
  }
      
}

//change password in profile by user

exports.changePassword=async (req,res,next)=>{
     
      //check old password
     try{
      const user=await usermodel.findById(req.user.id).select('+password');

      if(! await user.isValidPassword(req.body.oldpassword)){
           return res.status(400).json({
            success:false,
            message:"enter correct old password",
            user,
           
            
          })
      }
      console.log("gingi");
      user.password=req.body.password;
      await user.save();
     res.status(200).json({
        success:true,
        message:"changed",
        user
      })

    }
    catch(error){
          res.status(400).json({
            success:false,
           /* message:"Login first"*/
           message:"enter new password"
         })
    }
}

//updateProfile
exports.updateProfile=async (req,res,next)=>{

  try{

      /*let newData={
         name:req.body.name,
         email:req.body.email
      }*/
      let newData={name:req.body.name,email:req.body.email}

      const user=await usermodel.findByIdAndUpdate(req.user.id,newData,{
           new:true,
           runValidators:true
      });

      return res.status(200).json({
        success:true,
        user
      })

    }

    catch(error){
      if(error.name==="ValidationError"){
          return res.status(400).json({
              success:false,
              message:"Type a valid email or name"
          })
      }
      else{
          res.status(500).json({
             success:false,
             message:"Internal server error"
          })
      }
    }
}

//Admin :get allusers

exports.adminGetAllUsers=async (req,res,next)=>{
     const users=await usermodel.find();
     res.status(200).json({
        success:true,
        users
     })
}

//Admin:get single user
exports.adminGetSingleUser=async (req,res,next)=>{
  try{
    const user=await usermodel.findById(req.params.id);
    res.status(200).json({
      success:true,
      user
    })



  }
  catch(error){
       if(error.name==="CastError"){
           res.status(400).json({
              success:false,
              message:"user data is not found , enter correct id"
           })
       }
       else{
            res.status(500).json({
                success:false,
                message:"Internal server error"
            })
       }
  }
}

//Admin:Update user
exports.adminUpdateUser=async (req,res,next)=>{
     try{
         const newData={
             "name":req.body.name,
             "email":req.body.email,
             "role":req.body.role
         }

         const user=await usermodel.findByIdAndUpdate(req.params.id,newData,{
              new:true,
              runValidators:true

         })
         res.status(200).json({
             success:true,
             message:"updated successfully"
         })

     }
     catch(error){
          if(error.name==='CastError'){
               res.status(400).json({
                  success:false,
                  message:"user with the id could not be found"
               })
          }
          else{
            res.status(400).json({
              success:false,
              message:"Enter correct name or email or role"
           })
          }
     }
}

//Admin:delete user
exports.adminDeleteUser=async (req,res,next)=>{
  try{
     const user=await usermodel.findById(req.params.id);
     await user.deleteOne();
     res.status(200).json({
        success:true,
        message:"deleted successfully"
     })

}
catch(error){
    console.log(error);
      if(error.name==="CastError"){
        res.status(400).json({
          success:false,
          message:"user with the id could not be found"
       })
      }
      else{
        res.status(500).json({
          success:false,
          message:"Internal Server error"
       })
      }
}
}