import React, { useState,useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Navigate, useNavigate } from 'react-router-dom';

import './EmployeeCustomDropdown.css'

import { logout } from '../../actions/userAction';
import { logoutEmployee as logoutEmployeeAction } from '../../actions/authEmployeeAction';


function EmployeeCustomDropdown() {
   const dispatch=useDispatch();
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const navigate=useNavigate();
   //const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [employeeData, setEmployeeData] = useState(null);
   //const navigate = useNavigate();

   useEffect(() => {
      const storedEmployeeData = JSON.parse(localStorage.getItem('authEmployeeState'));
      if (storedEmployeeData) {
         setIsLoggedIn(true);
         setEmployeeData(storedEmployeeData);
      } else {
         setIsLoggedIn(false);
         setEmployeeData(null);
      }
   }, []);


   

   


   const EmployeelogoutHandler=()=>{
      //window.location.reload()
        localStorage.removeItem('authEmployeeState');
        //localStorage.clear()
        
        dispatch(logoutEmployeeAction)
        //localStorage.clear();
        navigate('/login/employee')
   }

   
    
 

  const [EmployeeshowDropdown, setEmployeeShowDropdown] = useState(false);

  const EmployeetoggleDropdown = () => {
    setEmployeeShowDropdown(!EmployeeshowDropdown);
  };
  
  
  //const{employee,isAuthenticatedEmployee}=useSelector(state=>state.authEmployeeState)
  const { isAuthenticatedEmployee, employee, error } = JSON.parse(localStorage.getItem('authEmployeeState'));
  let test=[];
  console.log("employee test",employee);


  employee.images.forEach(image=>{
    //images.push(image.Filename);
    const baseUrl = 'http://127.0.0.1:3000';
    
    // Use the URL object to create an absolute URL
    let absoluteUrl = new URL(image.Filename, baseUrl);

    // Check if the pathname includes '/images'
    if (!absoluteUrl.pathname.includes('/images')) {
        // Add '/images' at the beginning of the pathname
        absoluteUrl.pathname = '/images' + absoluteUrl.pathname;
    }

    // Remove '/public' from the pathname
    const relativePath = absoluteUrl.pathname.replace('/public', '');
    console.log("relative path",relativePath);

    test.push(relativePath);
});
  
  
  


  return (
    <div className={`Employeecustom-dropdown d-inline ${EmployeeshowDropdown ? 'show' : ''}`}>
      <div
        className="Employeeecustom-dropdown-toggle"
        onClick={EmployeetoggleDropdown}
      >
         <div className="Employeeavatar-name-container">
          <div className="Employeeavatar-container">
        <figure className="Employeeavatar-avatar-nav-custom-avatar">

        <img width="80px" height="50px"  src={test} alt="Avatar" />

        </figure>
        </div>
        <span className="Employeerun-machine">{employee?.name}</span>
      </div>
      </div>
      <div className="Employeecustom-dropdown-menu">
      
     {/*} <div className="Employeecustom-dropdown-item" onClick={()=>{
          navigate('/')
      }
         
      }>View Bookings Requested</div>*/}
      <div className="Employeecustom-dropdown-item" onClick={EmployeelogoutHandler}>Logout</div>
     
       
       
      </div>
    </div>
  );
}

export default EmployeeCustomDropdown;
