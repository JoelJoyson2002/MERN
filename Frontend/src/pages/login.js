
/*const Login=()=>{
    return(
        <>
        <div class="fpage">
        <div class="form">
            <h1>Login</h1><br/><br/>
            <form>
                 <label/>UserName<br/>
                 <input type="text"/><br/><br/>
                 <label/>Password<br/>
                 <input type="password"/><br/><br/>
                 <button class="b1"/> Log In 
    
            </form>
    
        </div>
        </div>
        </>
    
    )
}

export default Login;*/

import { useEffect, useState } from 'react';
import MetaData from '../MetaData';
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { clearAuthError, login } from '../actions/userAction';
import {toast} from 'react-toastify'

const Login = () => {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const{loading,error,isAuthenticated}=useSelector(state=>state.authState)
  /*const { isAuthenticatedEmployee, employee } = JSON.parse(localStorage.getItem('authEmployeeState'));
    console.log("isAuth",isAuthenticatedEmployee)*/


    // Check if localStorage item exists
  const authEmployeeState = JSON.parse(localStorage.getItem('authEmployeeState'));
  const isAuthenticatedEmployee = authEmployeeState ? authEmployeeState.isAuthenticatedEmployee : false;
  const employee = authEmployeeState ? authEmployeeState.employee : null;


  const submithandler=(e)=>{
       e.preventDefault();
       dispatch(login(email,password))
  }

  useEffect(()=>{
    if(isAuthenticated){
      toast("login success",{
        position:toast.POSITION.BOTTOM_CENTER,
        type:'success'
      })
      navigate('/')
    }
    
       if(error){
          toast(error,{
            position:toast.POSITION.BOTTOM_CENTER,
            type:'error',
            onOpen:()=>{ dispatch(clearAuthError)}
          })
          return
       }
    
  },[error,isAuthenticated,dispatch,navigate])
  
  return (
    <div className="fpage">
{/*<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"></link>*/}
      <MetaData title={'Login'}/>
        
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



      <div className="form-2">
       
        <form onSubmit={submithandler}className='f2'>
        <h1>Login</h1> <br/><br/>
          
          <label>email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <br/><br/>
          <label>Password</label>
          <input className='psw' type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
         {/* <i class="cmp bi bi-eye"></i>*/}
          <br/><br/>
          <button type="submit" disabled={loading} className="b1">Log In</button><br/> <br/>
          {
  isAuthenticatedEmployee ? (
    <Link to={'/employee/request'} style={{ color: 'orange' }}>Employee Login</Link>
  ) : (
    <Link to={'/login/employee'} style={{ color: 'orange' }}>Employee Login</Link>
  )
}
         
          <Link to={`/signup`} style={{ color: 'orange' }} className="Drago">Signup</Link><br/><br/>
          <Link to={`/password/forgot`} style={{ color: 'orange' }} className='Ryuga'>Forgot Password</Link>

          
          
        </form>
      </div>
    </div>
   { /*<script src='./toggleEye.js'></script>*/}
    </div>
  );
};

export default Login;