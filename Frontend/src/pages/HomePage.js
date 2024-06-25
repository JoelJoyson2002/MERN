import { useEffect } from 'react';
import MetaData from '../MetaData';
import { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css' 
import  {useDispatch, useSelector}   from 'react-redux';
import { getEmployees } from '../actions/employeesActions';
import { Dropdown,DropdownButton,Image } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import CustomDropdown from './customdropdown'; 
import EmployeeCustomDropdown from './employeespage/EmployeeCustomDropdown';

import { Link } from 'react-router-dom';
const Home=()=>{
     
    const{user,isAuthenticated}=useSelector(state=>state.authState);
    //const { isAuthenticatedEmployee, employee, error } = JSON.parse(localStorage.getItem('authEmployeeState'));
   // console.log("isAuth",isAuthenticatedEmployee)
    console.log("is",isAuthenticated)

   {/*useEffect(()=>{
            

    },[isAuthenticated==true,user]


)*/}
    {/*if(!isAuthenticated){
        return
    }*/}
    
    
    return(
       
        <div className="home">
            <MetaData title={'Welcome To'}>
               
            
            </MetaData>
            <div className="main">

         <div className="navbar">
             <div className="icon">
                <img src="/images/image3.jpg" className="image-1" alt="not found"></img>
             </div>
         <div className="menu">
           
            <ul>
               {/*} <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">our services</a></li>
                <li><a href="#">contact us</a></li>
    <li><a href="signup.html">Login/register</a></li>*/}
           <li><Link to={`/`}>Home</Link></li>
           <li><Link to={`/aboutus`}>About us</Link></li>
           <li><Link to={`/ourservices`}>Our Services</Link></li>
           <li><Link to={`/contactus`}>Contact Us</Link></li>

            {console.log("in",isAuthenticated)}

           



{isAuthenticated ? (
    <div className="afterlogin">
        <CustomDropdown />
    </div>
) : (
    <li><Link to={`/signup`}>Signup/Login</Link></li>
)}

    </ul>
    
         </div>



         </div>



    <img src="/images/image4.jpg" className="main_pic" alt="not found"></img>
    <div className="content">
        <h1>Welcome to TLC Company!</h1><br></br>
        <p>"Delivering Best Quality Services,<br></br> Securing Your Smile"</p>
    </div>

    </div> 
    </div>
    )
        
        
}

export default Home;