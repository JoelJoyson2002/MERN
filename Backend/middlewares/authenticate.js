const usermodel=require("../models/userModel")
const employeemodel=require("../models/employeeModel")
const jwt=require('jsonwebtoken');
exports.isAuthenticatedUser=async(req,res,next)=>{

    try{
     
    const{token}=req.cookies;
    
    if(!token){
        return res.status(401).json({
            message:"Log in first to handle this resource"
        })
    }
     
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    //console.log("decode",decoded)
    req.user=await usermodel.findById(decoded.id);
    next();
}
catch(error){
    res.status(500).json({
        message:"internal server error"
    })
}
}

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(401).json({
          success: false,
          message: `Role ${req.user.role} is not allowed`
        });
      }
      next();
    };
  };



  exports.isAuthenticatedEmployee=async(req,res,next)=>{

    try{
     
    const{employeetoken}=req.cookies;
    if(!employeetoken){
        return res.status(401).json({
            message:"Log in first to handle this resource"
        })
    }
     
    const decoded=jwt.verify(employeetoken,process.env.JWT_SECRET)
    req.employee=await employeemodel.findById(decoded.id);
    next();
}
catch(error){
    res.status(500).json({
        message:"internal server error"
    })
}
}