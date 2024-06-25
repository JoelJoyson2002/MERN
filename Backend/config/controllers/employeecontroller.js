const employeemodel=require('../../models/employeeModel');
const APIFeatures=require('../../utils/apiFeatures');

//get employee-/api/v1/emp
exports.getEmployee=async(req,res,next)=>{

        const apiFeatures=new APIFeatures(employeemodel.find(),req.query).search()

          const employee_details=await apiFeatures.query;

          //set 3 seconds delay
         await new Promise(resolve=>setTimeout(resolve,3000))
          res.status(200).json({
             
           
            success:true,
            count:employee_details.length,
            employee_details
          })

}

exports.extractEmployee=async(req,res,next)=>{

  try {
    const { location, service_type, time } = req.query;
    
    const currentDate = new Date();

    // Convert time to a number (e.g., "17:00" to 17)
    //const hour = parseInt(time.split(':')[0]);
    const query = {};
    query[`working.${time}`] = { $exists: true };
    
    // Query the database to find employees matching the criteria
    let extractemployees = await employeemodel.find({
        location: location,
        service_type: service_type,
       // [`working.${time}.isBooked`]: "false", // Match 'isBooked' field for the specified hour
           // [`working.${time}.date`]: "null" 
           //`working.${time}`: { $exists: true }
        // Match employees who work at the specified hour
        ...query
    });

    extractemployees = extractemployees.filter(employee => {
      const workingData = employee.working[time];
      console.log("firsrt",workingData.isBooked)
      if(workingData.isBooked=="false") return true;
      //console.log("hello")
      if (workingData.isBooked=="true" ) {
        console.log(workingData.Date)
        console.log(currentDate.toDateString())
          return workingData.Date !== currentDate.toDateString();
      }
      //console.log(new Date(workingData.date).toDateString())
      return true; // Include the employee if isBooked is false or date is null
  });
  
   console.log("emp",extractemployees[0])

    res.json(extractemployees[0]); // Return the employee details as JSON response
} catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};

//new employee-/api/v1/emp/new
/*exports.createEmployee=async(req,res,next)=>{
       const collection=await employeemodel.create(req.body);
       res.status(201).json({
         message:true,
         
          collection
       })
}*/

/*exports.createEmployee = async (req, res, next) => {
  try {
    const collection = await employeemodel.create(req.body);
    res.status(201).json({
      success: true,
      collection
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      // Extract the first validation error message
      const errorMessage = Object.values(error.errors)[0].message;

      return res.status(400).json({
        success: false,
        message: errorMessage
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An internal server error occurred. Please try again later."
      });
    }
  }
};*/


exports.ChangeDate=async(req,res,next)=>{

   try{
        const{empid,time}=req.query;
        console.log("time",time)
        const currentDate = new Date();
        const updatedEmployee = await employeemodel.findOneAndUpdate(
          { _id: empid },
          { $set: {
              [`working.${time}.isBooked`]: "true",
              [`working.${time}.Date`]: currentDate.toDateString()
          }},
          { new: true }
      );
      

     //employee.working[time].isBooked=true;
     //employee.working[time].Date=currentDate.toDateString();
     //console.log(employee)
     await updatedEmployee.save();
     console.log(updatedEmployee);
     const temp=updatedEmployee.toObject();
     
     console.log("temp",temp)
     await employeemodel.findByIdAndRemove(empid);
     //await employeemodel.findByIdAndRemove(empid);
     //await employeemodel.employees.insertOne(temp);
     //await tempEmployee.save();

     const tempEmployee = new employeemodel(temp);

        // Insert the temp employee into the database
        await tempEmployee.save();


    res.status(200).json({
        success:true,
        updatedEmployee
       
    })

        

   }
   catch(error){
         res.status(500).json({
             success:false,
             error
         })

   }
}



exports.createEmployee = async (req, res, next) => {
  try {
    let images=[]
    if(req.files.length>0){
      req.files.forEach((file)=>{
            let url=`${process.env.FRONTEND_URL}/public/images/${file.originalname}`
            images.push({Filename:url})

      })
    }
    req.body.images=images;

    let work={};
    let temp=req.body.working;

    let a=temp.split(" ");
    let  start= parseInt(a[0]);
    let end= parseInt(a[2]);
    console.log("start",start);
    console.log("end",end)
    for(let i=start;i<end;i++){
          work[i]={
            isBooked:"false",
            Date:""
          }
    }




    req.body.user=req.user.id;
    req.body.working=work;
    
    const collection = await employeemodel.create(req.body);
    


    res.status(201).json({
      success: true,
      collection
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      // Extract all validation error messages
      const errorMessages = Object.values(error.errors).map((error) => error.message);

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: String(errorMessages)
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An internal server error occurred. Please try again later."
      });
    }
  }
};




/*exports.getEmployeeById=async(req,res,next)=>{

   const employeeByid=await employeemodel.findById(req.params.id).exec();
   console.log(employeeByid);
   if(!employeeByid){
         
        return res.status(404).json({
          success:false,
          message:"enter valid Id"

         });
   }
   res.status(201).json({
         message:true,
         success:true,
         employeeByid
   })

}*/
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employeeById = await employeemodel.findById(req.params.id).exec(); // Add .exec() to await the query execution
    console.log("Employee ID:", req.params.id); // Debugging line
    if (!employeeById) {
      return res.status(404).json({
        success: false,
        message: "No employee found with the provided ID"
      });
    }
    //await new Promise(resolve=>setTimeout(resolve,3000))
    res.status(200).json({
      success: true,
      employeeById
      
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    if(error.name=="CastError"){
         res.status(400).json({
            success:false,
            message:`product not found:enter correct- ${error.path}`
         })
    }
    else{
    res.status(404).json({
      success: false,
      message: "An error occurred while fetching the employee by ID"
    });
  }
}
};

/*exports.employeeupdate=async(req,res,next)=>{
  try{
  const emp_update=await employeemodel.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  })
  if(!emp_update){
    return res.status(404).json({
      success:false
    })
  }

  res.status(203).json({
    success:true,
    emp_update

  })

}
catch(error){
    if(error.name=="Validationerror"){
       const e=Object.values(error.errors).map((value)=> value.message)
       res.status(400).json({
          success:false,
          message:String(e)
       })
    }
    else{
         res.status(500).json({
           success:false,
           message:"Internal Server error"
         })
    }
}
}*/

exports.employeeUpdate = async (req, res, next) => {
  try {
    const empUpdate = await employeemodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    //uploading images
    let images=[]
    
    //if images not cleared we keep existing images
    /*if(req.body.imagesCleared==='false'){
       images=empUpdate.images;
    }*/
   // console.log("req.file",req.files)
    if(req.files.length>0){
      req.files.forEach((file)=>{
            let url=`${process.env.FRONTEND_URL}/public/images/${file.originalname}`
            images.push({Filename:url})
            //console.log("backens",images)

      })
    }
    req.body.images=images;
    empUpdate.images = images;

    let work={};
    let temp=req.body.working;

    let a=temp.split(" ");
    let  start= parseInt(a[0]);
    let end= parseInt(a[2]);
    console.log("start",start);
    console.log("end",end)
    for(let i=start;i<end;i++){
          work[i]={
            isBooked:"false",
            Date:""
          }
    }




   
    req.body.working=work;
    empUpdate.working=work;

    // Save the updated document with new images
    await empUpdate.save();
    //console.log("images in req",req.body.images);

    if (!empUpdate) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }
    //console.log("empudate",empUpdate)
    res.status(200).json({
      success: true,
      empUpdate
    });
  } catch (error) {
    if (error.name === "ValidationError") {
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
};


exports.employeedelete=async(req,res,next)=>{
try{
  const e=await employeemodel.findById(req.params.id);
  if(!e){
    return res.status(404).json({
      success:false
    })
  }


    //const emp=await employeemodel.findById(req.params.id);
    await e.deleteOne();

    res.status(200).json({
      message:"deleted"
    })
  }
  catch(error){
     if(error.name=="CastError"){
         res.status(400).json({
            success:false,
            message:`Enter correct:${error.path}`
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

//creating review

exports.createReview=async (req,res,next)=>{
  try{
        const{empId,rating,comment}=req.body;
        
        const review={
            user:req.user.id,
            rating,
            comment,
            email:req.user.email
        }

        const employee=await employeemodel.findById(empId);

        //finding if user has already reviewed
        const isReviewed=employee.reviews.find((review)=>{
             return review.user.toString()==req.user.id.toString()
                  
             
        });


        if(isReviewed){
          //updating review
             employee.reviews.forEach((review)=>{
                  if(review.user.toString()==req.user.id.toString()){
                        review.rating=rating
                        review.comment=comment
                  }
                })
        }
        else{
          //creating review
          employee.reviews.push(review);
          employee.numofreviews=employee.reviews.length;
        }

        //find the average of the product reviews
        employee.rating=employee.reviews.reduce((acc,review)=>{
             return review.rating+acc;
        },0)/employee.reviews.length;

        employee.rating=isNaN(employee.rating)?0:employee.rating;

        await employee.save({validateBeforeSave:false});
        res.status(200).json({
          success:true,
          review

        })



  }
  catch(error){
    //console.log(error);
    res.status(400).json({
      success:false,
      message:`Enter correct:${error.path}`
   })
  }
}

// get review
exports.getReview=async (req,res,next)=>{
  try{
         const employee=await employeemodel.findById(req.params.id)/*.populate('reviews.user','name.email');*/
         const reviews=employee.reviews;
         res.status(200).json({
            success:true,
            reviews
         })

  }
  catch(error){
    res.status(400).json({
      success:false,
      message:`Enter correct:${error.path}`
   })
  }
}

//delete review

exports.deleteReview=async (req,res,next)=>{
  try{
       const employee=await employeemodel.findById(req.params.id);
       const review=employee.reviews.filter((object)=>{
            return object._id.toString()!==req.params.reviewId.toString();
       });

       const numofreviews=review.length;
       const rating=review.reduce((acc,r)=>{
        return r.rating+acc;
   },0)/review.length;

   await employeemodel.findByIdAndUpdate(req.params.id,{
        rating,
        numofreviews,
        reviews:review
   })

   res.status(200).json({
     success:true
   })


  }
  catch(error){
    console.log(error)
    res.status(400).json({
      success:false,
      message:`Enter correct:${error.path}`
   })
  }
}



//get admin employee-api/v1/admin/employees

exports.getAdminEmployees=async (req,res,next)=>{
  try{
       const employees=await employeemodel.find();
       res.status(200).send({
          success:true,
          employees
       })
   
  }
  catch(error){
    console.log(error)
    res.status(400).json({
      success:false,
      message:`Enter correct:${error.path}`
   })
  }
}
