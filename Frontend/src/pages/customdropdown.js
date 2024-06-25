import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import { Navigate, useNavigate } from 'react-router-dom';
import UserProfile from './userprofile';
import './customdropdown.css'
import ChooseService from './chooseService';
import Locations from './Location';
import FadeLoader from 'react-spinners/FadeLoader';

function CustomDropdown() {
   const dispatch=useDispatch();

   const navigate=useNavigate();
   const logoutHandler=()=>{
        dispatch(logout)
   }
    
 

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const{user,isAuthenticated}=useSelector(state=>state.authState);
  
  
  if(!user){
   /* setTimeout(function() {
      window.location.reload(); // Reload the current page after 3 seconds
  }, 2000); */
  return (
    "Please wait"
  );
  
  }
  console.log("vk",user)
  
  


  return (
    <div className={`custom-dropdown d-inline ${showDropdown ? 'show' : ''}`}>
      <div
        className="custom-dropdown-toggle"
        onClick={toggleDropdown}
      >
         <div className="avatar-name-container">
          <div className="avatar-container">
        <figure className="avatar-avatar-nav custom-avatar">

          <img width="80px" height="40px" src="/images/goku.png" alt="Avatar" />
        </figure>
        </div>
        <span className="run-machine">{user?.name}</span>
      </div>
      </div>
      <div className="custom-dropdown-menu">
      {user.role=='admin' && <div className="custom-dropdown-item" onClick={()=>{navigate('/admin/dashboard')}}>DashBoard</div>}
      <div className="custom-dropdown-item" onClick={()=>{
          navigate('/userprofile')
      }
         
      }>Profile</div>
      <div className="custom-dropdown-item" onClick={logoutHandler}>Logout</div>
      <div className="custom-dropdown-item" onClick={()=>{navigate('/loc')}}>Book</div>
      <div className="custom-dropdown-item" onClick={()=>{navigate('/orders')}}>My Bookings</div>
       
       
      </div>
    </div>
  );
}

export default CustomDropdown;
