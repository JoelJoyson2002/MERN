

import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './UpdateOrder.css'

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import CustomDropdown from '../customdropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { orderDetail as orderDetailAction } from '../../actions/orderActions';
import {  getEmployee, updateEmployee } from '../../actions/employeeAction';
import { clearEmployeeUpdated } from '../../slices/employeeSlice';
import { SendNot, clearAuthError } from '../../actions/userAction';
import { clearError } from '../../slices/orderSlice';
import { updateOrders } from '../../actions/orderActions';
import { clearOrderUpdated } from '../../slices/orderSlice';
//import { getEmployee } from '../../../../Backend/config/controllers/employeecontroller';


export default  function  UpdateOrder(){
 

const{employeeById}=useSelector(state=>state.employeeState);
console.log("empoloyyebyid",employeeById)

    

    const{user:users,isAuthenticated}=useSelector(state=>state.authState);
      const navigate=useNavigate();
      const{id:bookingid}=useParams();

      const[bookingstatus,setBookingstatus]=useState("processing");

      
      const{loading,isOrderUpdated,error,orderDetail}=useSelector(state=>state.orderState);
      
      const{user={},booktheprovider=[],shippingInfo={},serviceCharge=0,paymentInfo={}}=orderDetail;
      console.log("orderDetail",user)
      const isPaid=paymentInfo.status==='succeeded'?true:false;


      


      //console.log("empstate",employeeById)
    

    const dispatch=useDispatch();
 
    


    
  
  
 
  

const submithandler=(e)=>{
    e.preventDefault();
    
    
    const orderData={};
    orderData.bookingstatus=bookingstatus;
    dispatch(updateOrders(bookingid,orderData))
    console.log(orderDetail.book.shippingInfo.email)
    console.log(bookingstatus)
    console.log(orderDetail.book._id)
    //dispatch(SendNot(users.email,bookingstatus,orderDetail.book._id))
    setTimeout(() => {
       dispatch(SendNot(users.email, bookingstatus, orderDetail.book._id));
       window.location.reload()
  }, 2000);

  
    

    
    
    


}





useEffect(()=>{
   if(isOrderUpdated){
    
      toast(`successfully updated`,{
        type:'success',
        position:toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(clearOrderUpdated())
        
      })
     
      
      
      return;
   }
   if(error){
    toast(error,{
        type:'error',
        position:toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(clearError())
      })
      return;
   }

   dispatch(orderDetailAction(bookingid))

},[isOrderUpdated,error,dispatch])

useEffect(()=>{
  if(orderDetail._id){
    
       setBookingstatus(orderDetail.bookingstatus)

  }


},[orderDetail])










if(orderDetail.book==undefined ){
     
  return (
    <div className="loading">
      Loading...<br />
      <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
      <button className="shit" onClick={() => { console.log('Button clicked'); navigate(`/order/${bookingid}`); }}>Click here to go to orders</button>
      
    </div>
  );

}
console.log("orderdtail",orderDetail);







 



let path=orderDetail.book.booktheprovider[0].images[0].Filename.split("/")
//let path=employeeById.images[0].Filename.split("/")
console.log("path",path)
console.log("orderdtail",orderDetail);









console.log(users.email)
    console.log(bookingstatus)
    console.log(orderDetail.book._id)




    return(
                 
        <div className="Drumstick" style={{ height: '140vh' }}>
        <div className="Eggplant">
            <MetaData title={'admin/create/employee'}/>
            <div className="main">

<div className="navbar">
    <div className="icon">
       <img src="/images/image3.jpg" className="image1" alt="not found"></img>
    </div>
<div className="menu">
  
   <ul>
   <li><Link to={`/`}>Home</Link></li>
           <li><Link to={`/aboutus`}>About us</Link></li>
           <li><Link to={`/ourservices`}>Our Services</Link></li>
           <li><Link to={`/contactus`}>Contact Us</Link></li>
           {isAuthenticated?
              
              <div className="afterlogin">

        <CustomDropdown />
</div>

              
        :

        navigate('/login')
        
        

}
     </ul>

</div>
</div>
                    
<div className='Garlic'>
                    <div className="Sidebar">
                        <Sidebar/>
                    </div>
                    <div >
                        
                        
                    </div>
               </div>

               <div className="Aalu">
               {` Booking id #${bookingid} `}<br></br><br></br>

               Booking Info:<br></br>
               {`Name: ${users.name}`}<br></br>
              {`Address:${orderDetail.book.shippingInfo.address}`   }<br></br>
              {`phone:${orderDetail.book.shippingInfo.phone}`   }<br></br>
              {`postal code:${orderDetail.book.shippingInfo.postalcode}`}<br></br><br></br><br></br>
               
              
               Payment:Paid  <br></br>

               {`Booking Status:${orderDetail.book.bookingstatus}`}<br></br><br></br>

               Booked Service Provider
              <br></br>
              

              {`Name:${orderDetail.book.booktheprovider[0].name}`}<br></br>
             {/*<img src={`/images/${orderDetail.book.booktheprovider[0].image}`} alt="not found" /><br></br><br></br>*/}
             
             {`Service_type:${orderDetail.book.service_type}`}<br></br>
             {`Service to be provided at:${orderDetail.book.timeslot}:00`}<br></br>
             {`Date of booking:${orderDetail.book.Dates }`}<br></br>
             
             <img src={`/images/${path[path.length-1]}`} alt="not found"/>

              
              
              <div className='Bindi'>
                    <select 
                         onChange={e=>setBookingstatus(e.target.value)}
                         value={bookingstatus}
                         name="status">
                            <option value="Proceesing">Processing</option>
                            <option value="Accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            
                         </select>
                    <button disabled={loading} onClick={submithandler} className="Tamatar">update status</button>

              </div>
              
              
              <br></br>
              

               
               





       </div>




            
    


</div></div></div>
    )
}