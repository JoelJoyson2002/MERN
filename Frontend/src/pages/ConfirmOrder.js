
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';
import './ConfirmOrder.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { clearAuthError, updatePassword } from '../actions/userAction';
import { Navigate } from 'react-router-dom';
import CustomDropdown from './customdropdown';
import StarRating from './starrating';
import FadeLoader from "react-spinners/FadeLoader";
import { Dispatch } from 'react';
import { getEmployee } from '../actions/employeeAction';
import { useParams } from 'react-router-dom';


export default function ConfirmOrder(){
   const navigate=useNavigate();
   const dispatch=useDispatch();
   const{empid,timeslot}=useParams();
   const{user,isAuthenticated}=useSelector(state=>state.authState);
   const{shippingInfo}=useSelector(state=>state.cartState)
   
   const{loading,employeeById}=useSelector((state)=>{
    return state.employeeState
});

//console.log("empid",employeeById)






useEffect(()=>{
    if (!employeeById) {
        
        dispatch(getEmployee(empid));
      }
    
       
},[dispatch,employeeById])

if(!employeeById){
  return
}

let path=employeeById.images[0].Filename.split("/");




const processPayment=()=>{
  const data={
      serviceCharge:employeeById.serviceCharge
  }
  sessionStorage.setItem('orderInfo',JSON.stringify(data))
  setTimeout(function() {
    window.location.reload(); // Reload the current page after 2 seconds
}, 3000);
  navigate(`/payment/${empid}/${timeslot}`)
}

if(!isAuthenticated){
     
    return (
      <div className="loading">
        Loading...<br />
        <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
        <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
        
      </div>
    );
  
}
if(!employeeById){
    return (
        <div className="loading">
          Loading...<br />
          <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
          
          
        </div>
      );
   
}



    return(

        <div className="Thumb" style={{ height: '140vh' }}>
        <div className="Index">
            <MetaData title={'updatepassword'}/>
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
        
       <Navigate to="/login"/>

}
     </ul>

</div>
</div>

       <div className="Ring">
               <h2>Booking Info</h2>
       </div>
       <div className="Little">
        Name:{`${user.name}`}
        <br></br>
        Phone:{`${shippingInfo.phone}`}
        <br></br>
        Address:{`${shippingInfo.address}`}
        <br></br>
        Postal Code:{`${shippingInfo.postalcode}`}
        <br></br>
       </div>
        

       <div className='Toe'>
            <h2>Booking Summary</h2><br></br><br></br>
            Amount:{`${employeeById.serviceCharge}`}
            <br></br><br></br>
            <button className="Nails" onClick={processPayment}>Proceed to Payment</button>

        </div>


        <div className="Middle">

           <h3>Your Chosen Service Provider</h3><br></br>
           <div className="Leg">
        {/*<img src={`/images/${employeeById.images[0].Filename}`} alt="not found" />*/}
        
        <img src={`/images/${path[path.length-1]}`} alt="not found"/>
        <br></br><br>
        </br>

        <div className='Heel'>
        <span className="name1" ><span style={{color:'blue'}}>Name: </span> {employeeById.name}</span><br /> 
        <span className="age1" ><span style={{color:'blue'}}>Age: </span> {employeeById.age}</span><br />
        <span className="empid1"><span style={{color:'blue'}}>Empid: </span> {employeeById._id}</span><br />
        <div className="charge1"><span style={{color:'blue'}}>Service-Charge: </span>Rs.{employeeById.serviceCharge}</div>
        <span className="experience1"><span style={{color:'blue'}}>Experience: </span> {employeeById.experience}</span><br />
        <span className="contacts1"><span style={{color:'blue'}}>Phone:</span> {employeeById.contact}</span><br />
        <span className="email1"><span style={{color:'blue'}}>Email: </span> {employeeById.email}</span><br />
        <span className="service_type"><span style={{color:'blue'}}>Service Type: </span> {employeeById.service_type}</span><br />
        <span className="service_type"><span style={{color:'blue'}}>Service Needed at time: </span> {timeslot}:00</span><br />
        <span className="company1"></span><br />
        
       
      {/*  <div className="starss1"><span className='Thigh' style={{color:'blue'}}>Rating:  </span> <StarRating arg={employeeById.star_rating}/></div>
        <span className="reviews1"><span style={{color:'blue'}}>Number-of-Reviews: </span>{employeeById.numofreviews}</span><br /> */}

        </div>
      </div>



        </div>

        

     
        </div>
        </div>
        </div>     

        
    )



}

