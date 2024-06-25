import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './employeeLogin.css'


import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import CustomDropdown from './EmployeeCustomDropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Employeelogin as EmployeeLoginAction, clearEmployeeAuthError} from '../../actions/authEmployeeAction';
import { clearLoginError } from '../../slices/authEmployee';


export default function EmployeeLogin(){

  const navigate=useNavigate();

   
  

    
    const{isAuthenticatedEmployee,employee,error}=useSelector(state=>state.authEmployeeState)

    
    

    console.log("isAUth",isAuthenticatedEmployee)

   

   
    
    

   

    
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    
    const dispatch=useDispatch()

    useEffect(() => {
      // Save authEmployeeState to localStorage whenever it changes
      localStorage.setItem('authEmployeeState', JSON.stringify({ isAuthenticatedEmployee, employee, error }));
  }, [isAuthenticatedEmployee, employee, error]);


    const submithandler=(e)=>{
      e.preventDefault();
      dispatch(EmployeeLoginAction(email,password))
     
      
      
      

    }
    
  useEffect(()=>{
    if(isAuthenticatedEmployee){
      toast("login success",{
        position:toast.POSITION.BOTTOM_CENTER,
        type:'success'
      })
      setTimeout(function() {
        window.location.reload(); // Reload the current page after 2 seconds
    }, 2000); 
      navigate('/employee/request')

    }
    
       if(error){
          toast(error,{
            position:toast.POSITION.BOTTOM_CENTER,
            type:'error',
            onOpen:()=>{ dispatch(clearEmployeeAuthError)}
          })
          return
       }
    
  },[error,isAuthenticatedEmployee,dispatch,navigate])
  
    
    /*if(!isAuthenticatedEmployee){
     
        return (
          <div className="loading">
            Loading...<br />
            <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
            <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
            
          </div>
        );
      
    }*/

    if (isAuthenticatedEmployee) {
      // Redirect to another page if user is already authenticated
      return <Navigate to="/employee/request" />;
  }





    return(

        <div className="Pineapple" style={{ height: '140vh' }}>
        <div className="Watermelon">
            <MetaData title={'Booking'}/>
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
           {/*{isAuthenticatedEmployee?
              
              <div className="afterlogin">

        <CustomDropdown />
</div>

              
        :

           navigate('/login')*/}
           <li><Link to={`/login`}>Login</Link></li>

           
        
        


     </ul>

</div>
</div>
       
      
       
       <form  onSubmit={submithandler} className='Banana'>
       <h1>Service Provider Login</h1> <br/><br/>

       <label>Email</label>
         <input type="email"  name="email"  value={email} onChange={(e)=>setEmail(e.target.value)} required
          
         />
         <br/><br/>

         <label>Password</label>
         <input type="password"  name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required
          
         />
         <br/><br/>

         
         
         
         <button type="submit"  className="Litchi">Log in</button><br></br><br/>
        
       </form>
     
        </div>
        </div>
        </div>     

       

    )
}