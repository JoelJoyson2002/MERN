
import './ResetPassword.css'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { clearAuthError, forgotPassword, resetPassword } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from './customdropdown';















export default function ResetPassword(){

         const[password,setPassword]=useState("");
         const[confirmPassword,setConfirmPassword]=useState("");
         const dispatch=useDispatch();
         const{isAuthenticated,error}=useSelector(state=>state.authState);
         console.log("is",isAuthenticated)
         console.log(error)
         const navigate=useNavigate();
         const{token}=useParams();

         const submithandler=(e)=>{
            console.log("hello")
            e.preventDefault();
            const jsonData = {
       
                password:password,
                confirmPassword:confirmPassword
                 // Add other fields as needed
             }

             dispatch(resetPassword(jsonData,token))
         }

         useEffect(()=>{
            console.log(isAuthenticated);

            if(isAuthenticated){
                toast("Password Set Success",{
                    type:'success',
                    position:toast.POSITION.BOTTOM_CENTER
                })

                /*navigate('/')*/
                return;
            }
            if(error){
                toast(error,{
                    type:'error',
                    position:toast.POSITION.BOTTOM_CENTER,
                    onOpen:()=>{dispatch(clearAuthError)}
                })
                
                return
            }


         },[isAuthenticated,error,dispatch])






    return(
             
        <div className="Kyoya" style={{ height: '140vh' }}>
        <div className="Leon">
            <MetaData title={'ResetPassword'}/>
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
       
      
       
       <form onSubmit={submithandler} className='Green'>
       <h1>New Password</h1> <br/><br/>

       <label>Password</label>
         <input type="password"  name="password"  value={password} onChange={e=>setPassword(e.target.value)}
          
         />
         <br/><br/>

         <label>Confirm Password</label>
         <input type="password"  name="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}
          
          
         />
         <br/><br/>
         
         
         
         
         <button type="submit"  className="Wind">Set Password</button><br></br><br/>
        
       </form>
     
        </div>
        </div>
        </div>     


    )
}