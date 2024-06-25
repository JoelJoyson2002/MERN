import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './UpdateUser.css'

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import CustomDropdown from '../customdropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getAdminEmployees } from '../../actions/employeesActions';
import {  getEmployee, updateEmployee } from '../../actions/employeeAction';
import { clearEmployeeUpdated } from '../../slices/employeeSlice';
import { clearAuthError, updateUser,getUser } from '../../actions/userAction';
import { clearError,clearuserUpdated } from '../../slices/userSlice';
//import { getEmployee } from '../../../../Backend/config/controllers/employeecontroller';


export default  function  UpdateUser(){
    

    const{isAuthenticated}=useSelector(state=>state.authState);
      const navigate=useNavigate();

      const[name,setName]=useState("");
      const[email,setEmail]=useState("");
      const[role,setRole]=useState("");
      
      const{id:userId}=useParams();
      const{loading,isUserUpdated,error,user}=useSelector(state=>state.userState);
      const{user:authuser}=useSelector(state=>state.authState);

    const dispatch=useDispatch();


    

    



 
  

const submithandler=(e)=>{
    e.preventDefault();
    const userdata={};
    
    const formData=new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('role',role);
    console.log("form",formData)

    userdata["name"] = name;
    userdata["email"] = email;
    userdata["role"] = role;
    

    dispatch(updateUser(userId,userdata))
    
    


}



useEffect(()=>{
   if(isUserUpdated){
    
      toast(`User successfully updated`,{
        type:'success',
        position:toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(clearuserUpdated())
        
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

   dispatch(getUser(userId))

},[isUserUpdated,error,dispatch])

useEffect(()=>{
  if(user._id){
     setName(user.name);
     setEmail(user.email);
     setRole(user.role);
     
     
     
     
    

      
     

        

  }


},[user])



    return(
                 
        <div className="Galangal" style={{ height: '140vh' }}>
        <div className="Lemongrass">
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



    <form  onSubmit={submithandler} className='Collard'>
       <h1>Update User</h1> <br/><br/>

       <label>Name</label>
         <input type="text"  name="name"  required
         onChange={e=>setName(e.target.value)}
         value={name}
          
         />
         <br/><br/>

         <label>Email</label>
         <input type="email"  name="email" required
         onChange={(e)=>{
            setEmail(e.target.value)
         }}
         value={email}
          
         />
         <br/><br/>

         

         

         



         <label>Role</label>
         <select disabled={user._id===authuser._id} value={role} onChange={e=>setRole(e.target.value)} className='Kohlrabi' required>
                 <option value="">Select</option>
                 <option value="admin">Admin</option>
                 <option value="user">User</option>
                 

         </select>
         <br/><br/>
         

         

         
         

        
         
         
         



         
         
         
         
         <button type="submit" disabled={loading} className="Soya">Update</button><br></br><br/>
        
       </form>


</div></div></div>
    )
}