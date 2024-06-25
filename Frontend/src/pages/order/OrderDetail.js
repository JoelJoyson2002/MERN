import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './OrderDetail.css'
import { getEmployee } from '../../actions/employeeAction';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import CustomDropdown from '.././customdropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { orderDetail as orderDetailAction } from '../../actions/orderActions';



export default function OrderDetail(){
    //const{error,message,isAuthenticated}=useSelector(state=>state.authState);
    
   // const navigate=useNavigate();
    const{orderDetail,loading}=useSelector(state=>state.orderState)
    
    const dispatch=useDispatch();
    console.log("oserDetail",orderDetail)
    const{id}=useParams();
   
    
    //console.log("oserDetail",orderDetail)
    const navigate=useNavigate();
    const{isAuthenticated}=useSelector(state=>state.authState);
    
    useEffect(()=>{
        dispatch(orderDetailAction(id))
    },[dispatch])

    


    console.log("oserDetail",orderDetail)
    if(orderDetail.book==undefined){
     
        return (
          <div className="loading">
            Loading...<br />
            <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
            <button className="shit" onClick={() => { console.log('Button clicked'); navigate(`/order/${id}`); }}>Click here to go to orders</button>
            
          </div>
        );
      
    }
    //let path=orderDetail.book.booktheprovider[0].image.split("/");
    if(!orderDetail) return
    let path=orderDetail.book.booktheprovider[0].images[0].Filename.split("/");
    //let path=employeeById.images[0].Filename.split("/");
    
  

    return(
        <div className="Brinjal" style={{ height: '140vh' }}>
        <div className="Pumpkin">
            <MetaData title={'Booking'}/>
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
       <div className="Lady">
          <div className="Peach">
               {` Order #${id} `}<br></br>
               
               {`Name:${orderDetail.book.booktheprovider[0].name}`}<br></br>
               Payment:Paid  <br></br>
              {` Booking Status:${orderDetail.book.bookingstatus}`}<br></br>
              
            {/* Booking Info:<br></br>
              {`Address:${orderDetail.book.shippingInfo.address}`   }<br></br>
              {`phone:${orderDetail.book.shippingInfo.phone}`   }<br></br>
{`Service_type:${orderDetail.book.service_type}`}<br></br><br></br>*/} 

              {`Mobile No: ${orderDetail.book.booktheprovider[0].contact}`} <br/>
              {`Email: ${orderDetail.book.booktheprovider[0].email}`} <br/>
              {`Booked at:${orderDetail.book.Dates}`}<br/>
              {`Time when service Needed:${orderDetail.book.timeslot}:00`}<br/>


              </div> <br></br>
              
              <img src={`/images/${path[path.length-1]}`} alt="not found"/>

               
               





       </div>








</div>
        </div>
        </div>
    )
}