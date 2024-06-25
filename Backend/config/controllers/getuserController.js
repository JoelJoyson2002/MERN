

const usermodel=require("../../models/userModel");

exports.getUser=async(req,res,next)=>{
    try{
         
    const userData=await usermodel.findById(req.params.userid);

    res.status(200).json({
        success:true,
        userData
    })


    }
    catch(error){
        res.status(500).json({
            message:error,
            sucess:false

        })
    }


}
