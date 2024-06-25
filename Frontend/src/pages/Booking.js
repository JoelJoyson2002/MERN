import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';

import './Booking.css'
import { getEmployee } from '../actions/employeeAction';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { clearAuthError, forgotPassword } from '../actions/userAction';
import CustomDropdown from './customdropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";
import { clearLocalStorage, saveShippingInfo } from '../slices/cartSlice';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function Booking(){

    const{loading,error,user,message,isAuthenticated}=useSelector(state=>state.authState);
    const navigate=useNavigate();

    
    const{empid,timeslot}=useParams();
    
    const{employeeById}=useSelector(state=>state.employeeState);

    console.log("joel",employeeById)

    const{shippingInfo={}}=useSelector(state=>state.cartState)
    const[address,setAddress]=useState('')
    const[phone,setPhone]=useState('')
    const[postalcode,setPostalCode]=useState('');
    const dispatch=useDispatch()


    const submithandler=(e)=>{
      e.preventDefault();
      dispatch(saveShippingInfo({address,phone,postalcode}))
      navigate(`/confirm/order/${empid}/${timeslot}`)
      
      
      

    }
    
    if(!isAuthenticated){
     
        return (
          <div className="loading">
            Loading...<br />
            <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
            <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
            
          </div>
        );
      
    }





    return(

        <div className="Jupiter" style={{ height: '140vh' }}>
        <div className="Galaxy">
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
       
      
       
       <form  onSubmit={submithandler} className='Violet'>
       <h1>Booking</h1> <br/><br/>

       <label>Enter Address</label>
         <input type="text"  name="address"  value={address} onChange={(e)=>setAddress(e.target.value)} required
          
         />
         <br/><br/>

         <label>Enter Phone Number</label>
         <input type="number"  name="phone_number" value={phone} onChange={(e)=>setPhone(e.target.value)} required
          
         />
         <br/><br/>

         <label>Enter Postal Code</label>
         <input type="number"  name="postalcode" value={postalcode} onChange={(e)=>setPostalCode(e.target.value)} required
          
         />
         <br/><br/>


         
         
         
         
         <button type="submit"  className="Bey">Continue</button><br></br><br/>
        
       </form>
     
        </div>
        </div>
        </div>     

       

    )
}