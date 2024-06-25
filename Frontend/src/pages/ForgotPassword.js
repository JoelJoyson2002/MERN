import './ForgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { clearAuthError, forgotPassword } from '../actions/userAction';
import CustomDropdown from './customdropdown';




export default function ForgotPassword(){

const{loading,error,user,message,isAuthenticated}=useSelector(state=>state.authState);
console.log("isAuthinforgot",isAuthenticated);
const[email,setEmail]=useState("");
const dispatch=useDispatch();
const submithandler=(e)=>{
    e.preventDefault();
    const jsonData = {
       
       email:email
        // Add other fields as needed
    };
    dispatch(forgotPassword(jsonData))
}

useEffect(()=>{
    if(message){
        toast(message,{
            type:'success',
            position:toast.POSITION.BOTTOM_CENTER
        })
        setEmail("");
        return
    }
    if(error){
        toast(error,{
            type:'error',
            position:toast.POSITION.BOTTOM_CENTER,
            onOpen:()=>{dispatch(clearAuthError)}
        })
        
        return
    }
},[message,error,dispatch])









    
           
    return(
        <div className="Hagane" style={{ height: '140vh' }}>
        <div className="Pegasus">
            <MetaData title={'forgotpassword'}/>
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
        
        <li><Link to={`/signup`}>Signup/Login</Link></li>

}
     </ul>

</div>
</div>
       
      
       
       <form onSubmit={submithandler} className='Blue'>
       <h1>Forgot Password</h1> <br/><br/>

       <label>Enter Email</label>
         <input type="email"  name="email" value={email} onChange={e=>setEmail(e.target.value)}
          
         />
         <br/><br/>
         
         
         
         
         <button type="submit"  className="BeyBlade">Send email</button><br></br><br/>
        
       </form>
     
        </div>
        </div>
        </div>     

        
    )



}
    
