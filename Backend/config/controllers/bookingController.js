

const bookingmodel=require('../../models/BookServiceModel');



exports.newBooking=async (req,res,next)=>{

    try{

   /* const{
        serviceRequester,
        
        booktheprovider,
        employeeservicecharge,
        paymentinfo
    }=req.body;*/
    const{
        booktheprovider,
        paymentInfo,
        serviceCharge,
        shippingInfo,
        user,
        service_type,
        timeslot,
        Dates
    }=req.body;

    /*const book=await bookingmodel.create({
        serviceRequester,
        
        booktheprovider,
        employeeservicecharge,
        paymentinfo,
        paidAt:Date.now(),
        user:req.user.id
    })*/
    const book=await bookingmodel.create({
        
        
        booktheprovider,
        paymentInfo,
        serviceCharge,
        shippingInfo,
        service_type,

        Dates,
        
        
        user,
        timeslot,
        paidAt:Date.now()
    })
    

    res.status(200).json({
        success:true,
        book
    })
}
catch(error){
    res.status(400).json({
        success:false,
        message:"enter valid details"
    })
}


}

//get single booking

exports.getSingleBooking=async (req,res,next)=>{
    try{
      //const book=await bookingmodel.findById(req.params.id).populate('user','name email');
      const book=await bookingmodel.findById(req.params.id);
      
      if(!book){
          res.status(400).json({
             success:false,
             message:"data with the id is not found"
          })
      }
      res.status(200).json({
         success:true,
         message:"success",
         book
      })
    }
    catch(error){
        if(error.name==="CastError"){
            res.status(400).json({
                success:false,
                message:"enter correct id"
            })
        }
    }
}
// getting logged in user orders

exports.getLoggedInUserOrders=async (req,res,next)=>{
     try{
        const bookings=await bookingmodel.find({user:req.user.id});
       // console.log("getlogg",bookings)
        res.status(200).json({
            success:true,
            bookings
        })
     }
     catch(error){
        if(error.name==="CastError"){
            res.status(400).json({
                success:false,
                message:"enter correct id"
            })
        }
     }
}

exports.getEmployeeUserOrders=async (req,res,next)=>{
    try{
       const bookings=await bookingmodel.find( );
       //console.log("id",bookings[0].booktheprovider[0].employee)
       
       res.status(200).json({
           success:true,
           bookings
       })
    }
    catch(error){
       if(error.name==="CastError"){
           res.status(400).json({
               success:false,
               message:"enter correct id"
           })
       }
    }
}

//Admin: get all orders
exports.getAllBookings=async (req,res,next)=>{
    try{
    const bookings=await bookingmodel.find();
    console.log("get all",bookings)
    let totalcost=0;
    bookings.forEach((objects)=>{
        totalcost+=objects.employeeservicecharge;
    })

    res.status(200).json({
        success:true,
        totalcost,
        bookings
    })


    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"enter correct id"
        })
    }

}


//admin: update booking

exports.updatebooking=async (req,res,next)=>{
    try{
    const book=await bookingmodel.findById(req.params.id);
    console.log("book",book)
    if(book.bookingstatus=="delivered"){
        return res.status(400).json({
            message:"Already delivered"
        })
    }
    book.bookingstatus=req.body.bookingstatus;
    book.bookedat=Date.now();
    await book.save();
    res.status(200).json({
        success:true,
       
    })


    }
    catch(error){
        if(error.name==="CastError"){
            res.status(400).json({
                success:false,
                message:"enter correct id"
            })
        }
        else{
            console.log(error)
            res.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
    }
}
//admin:delete booking
exports.deletebooking=async (req,res,next)=>{
    try{
    const book=await bookingmodel.findById(req.params.id);
    //console.log("book",book);
    await book.deleteOne();
    res.status(200).json({
        success:true,
        message:'deleted successfully'
    })

    }
    catch(error){
        if(error.name==='CastError'){
            res.status(400).json({
                success:false,
                message:"enter correct id"
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