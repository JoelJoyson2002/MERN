import MetaData from '../MetaData';
import './signup.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { register } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { clearAuthError } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
const Signup=()=>{
    const[userData,setUserData]=useState({
        name:"",
        email:"",
        password:""
    })
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const{loading,error,isAuthenticated}=useSelector(state=>state.authState)
    const onChange=(e)=>{
        setUserData({...userData,[e.target.name]:e.target.value})
    }

    const submithandler=(e)=>{
        e.preventDefault();
        /*const formdata=new FormData();
        formdata.append("name",userData.name)
        formdata.append("email",userData.email)
        formdata.append("password",userData.password)*/
        dispatch(register(userData))

    }
    useEffect(()=>{

        if(isAuthenticated){
            navigate('/')
        }
        if(error){
            const errorString = JSON.stringify(error);
            toast(errorString,{
              position:toast.POSITION.BOTTOM_CENTER,
              type:'error',
              onOpen:()=>{ dispatch(clearAuthError)}
            })
            return
         }



    },[error,isAuthenticated,dispatch,navigate])
   return(
    <div className='signup'>
        <MetaData title={'signup'}/>
        
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
           <li><Link to={`/signup`}>Signup/Login</Link></li>
     </ul>

</div>



</div>



    <form onSubmit={submithandler} className="First">
    <h1> Register</h1><br></br><br></br>

    
    <label>Name</label><br></br>
    <input name="name" onChange={onChange} type="text"></input><br></br><br></br>
    <label>email</label><br></br>
    <input name="email" onChange={onChange} type="email"/><br></br><br></br>
    <label>password</label><br></br>
    <input name="password" onChange={onChange} type="password"/><br></br><br></br>
    <button disabled={loading} type="submit" className="register">Register</button><br></br> <br></br>
   
    <div class="fw">
        Already have an account? <Link to={`/login`}>Login</Link>
    </div>
   
</form>
</div>
</div>

   )



}

export default Signup;