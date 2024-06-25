import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';
import './updateprofile.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateProfile, updateProfileChanges } from '../actions/userAction';
import { toast } from 'react-toastify';
import { clearAuthError } from '../actions/userAction';
import { clearUpdateProfile, updateProfileChange } from '../slices/authSlice';
import { Navigate } from 'react-router-dom';
import CustomDropdown from './customdropdown';

const UpdateProfile=()=>{
    const{isAuthenticated}=useSelector(state=>state.authState);
    
    const{loading,error,user,isUpdated}=useSelector(state=>state.authState);

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
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
            name: name,
            email: email,
            // Add other fields as needed
        };
        
       
        dispatch(updateProfile(jsonData))

    }
    useEffect(()=>{
        console.log("error",error)
        if(user){
            console.log("user",user);
            setName(user.name)
            setEmail(user.email)
        }
         
         if(isUpdated){
            
            console.log("balh")
            toast("Profile updated successfully",{
              position:toast.POSITION.BOTTOM_CENTER,
              type:'success',
              onOpen:()=>dispatch(clearUpdateProfile())
             
              
            })

            
           
           
            return;
         }
         if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            setTimeout(function() {
                window.location.reload(); // Reload the current page after 3 seconds
            }, 2000); 
            return;
        }
        



    },[user,error,isUpdated,dispatch])
    

    

    return(
        <div className="Virat" style={{ height: '140vh' }}>
        <div className="King">
            <MetaData title={'updateprofile'}/>
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
       
      
       
       <form onSubmit={submithandler}className='Kohli'>
       <h1>Update Profile</h1> <br/><br/>

       <label>Name</label>
         <input type="text"  name="name"  value={name} onChange={e=>
            setName(e.target.value)

         }
          
         />
         <br/><br/>
         
         <label>email</label>
         <input type="email" name="email"  value={email} onChange={
            e=>
                setEmail(e.target.value)
            
         }/>
         <br/><br/>
         
         <button type="submit"  className="Cheeku">Update</button><br></br><br/>
        
       </form>
     
        </div>
        </div>
        </div>     

        
    )



}


export default UpdateProfile;