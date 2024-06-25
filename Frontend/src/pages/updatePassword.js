
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';
import './updatepassword.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { clearAuthError, updatePassword } from '../actions/userAction';
import { Navigate } from 'react-router-dom';
import CustomDropdown from './customdropdown';


const UpdatePassword=()=>{
    
    
    const{user,isUpdated,error,isAuthenticated}=useSelector(state=>state.authState);
    console.log("userinpass",user)

    const[oldpassword,setOldpassword]=useState("");
    const[password,setPassword]=useState("");
    const dispatch=useDispatch();
    /*const[userData,setUserData]=useState({
        name:"",
        email:""
       
    })*/
    
   

    const submithandler=(e)=>{
        e.preventDefault();
        /*const formdata=new FormData();
        
        formdata.append("name",name)
        formdata.append("email",email)*/
        const jsonData = {
            oldpassword: oldpassword,
            password: password,
            // Add other fields as needed
        };
        console.log(jsonData)
        console.log("abc",error)
        
       
        dispatch(updatePassword(jsonData))

    }
    useEffect(()=>{
        
        
         
         if(isUpdated){
           
            toast("Password updated successfully",{
              position:toast.POSITION.BOTTOM_CENTER,
              type:'success',
             
              
            })

            setOldpassword("");
            setPassword("");
           
            return;
         }
         if(error){
            console.log("ghy",error)
            const errorString = JSON.stringify(error);
            toast(errorString,{
              position:toast.POSITION.BOTTOM_CENTER,
              type:'error',
              onOpen:()=>{ dispatch(clearAuthError)}
            })
            console.log("is",isAuthenticated)
           // window.location.reload();
           setTimeout(function() {
            window.location.reload(); // Reload the current page after 3 seconds
        }, 2000); 

            return;
            
            
            
         }
        
        
        

    },[error,isUpdated,dispatch])

  
     
    

    return(
        <div className="Shreyas" style={{ height: '140vh' }}>
        <div className="Iyer">
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
       
      
       
       <form onSubmit={submithandler}className='Captain'>
       <h1>Update Password</h1> <br/><br/>

       <label>Old Password</label>
         <input type="password"  name="oldpassword"  value={oldpassword} onChange={e=>
            setOldpassword(e.target.value)

         }
          
         />
         <br/><br/>
         
         <label>New password</label>
         <input type="password" name="password"  value={password} onChange={
            e=>
                setPassword(e.target.value)
            
         }/>
         <br/><br/>
         
         <button type="submit"  className="Capitals">Update</button><br></br><br/>
        
       </form>
     
        </div>
        </div>
        </div>     

        
    )



}


export default UpdatePassword;