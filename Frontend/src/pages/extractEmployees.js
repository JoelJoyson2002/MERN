

import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';

import './extractEmployee.css'
import { getEmployee } from '../actions/employeeAction';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { clearAuthError, forgotPassword } from '../actions/userAction';
import CustomDropdown from './customdropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";
import { clearLocalStorage, saveShippingInfo } from '../slices/cartSlice';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { extractEmployees } from '../actions/employeesActions';


export default function ExtractEmployee(){

    const{loading,error,user,message,isAuthenticated}=useSelector(state=>state.authState);
    const{extractemployee_details=[]}=useSelector(state=>state.employeesState)
    const navigate=useNavigate();

    const{location,service,timeslot}=useParams();

    const dispatch=useDispatch();

    useEffect(()=>{

        dispatch(extractEmployees(location,service,timeslot))


    },[dispatch,extractEmployees])



    


    

    


    

   


   
  
   
    
    
    
   

    

    const currentDate = new Date();
  console.log("current date",currentDate.toDateString())
    
    
    
    if(!isAuthenticated){
     
        return (
          <div className="loading">
            Loading...<br />
            <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
            <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
            
          </div>
        );
      
    }
    if(!extractemployee_details){
      console.log("first")
        return (
            <div className="service_unavailable">
              Service Unavailable<br />
              
              
              
            </div>
          );
    } 
  

    let path=""
    console.log("extract",extractemployee_details.images)
    let test=""

    if(extractemployee_details!=""){
         path=extractemployee_details.images[0].Filename.split("/");
        console.log("lio",path[path.length-1])
        
        

    }



    return(

      

        <div className="Longan" style={{ height: '140vh' }}>
        <div className="Canistel">
            <MetaData title={'choose time'}/>
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
       
<div className="partition-container">  
    
    <div className='partition'>
      <img src={`/images/${path[path.length-1]}`}  className="image" alt="not found" /><br></br>
      <span className="name">{extractemployee_details.name}</span><br></br>
      <span className="age">{`age: ${extractemployee_details.age}`}</span><br></br>
      
      <Link to={`/emp/empid/${extractemployee_details._id}/${timeslot}`}><button className="view-details-button">View Details</button></Link>
    </div>

    </div>
       
       
     
        </div>
        </div>
        </div>     

       

    )
}