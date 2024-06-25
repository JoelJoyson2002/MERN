

import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';

import './SelectTime.css'
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


export default function SelectTime(){

    const{loading,error,user,message,isAuthenticated}=useSelector(state=>state.authState);
    const navigate=useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

    const currentHours = currentTime.getHours();

    const{location,service}=useParams();


    

   // const[time,setTime]=useState("09 to 17");
   //const [time, setTime] = useState(currentHours >= 9 && currentHours < 17 ? "09 to 17" : "01 to 09");


   const [time, setTime] = useState(
    currentHours >= 9 && currentHours < 17
      ? "09 to 17"
      : currentHours >= 17 && currentHours <= 23
      ? "17 to 23"
      : "01 to 09"
  );
  
   
    
    
    
   

    console.log("houes",currentHours)
   
    let showOptions1=false;
    let showOptions2=false;
   let showOptions3=false;

    if ( currentHours < 9) {
        showOptions1 = true; // Hide options for Shift-1
    }  if ( currentHours < 17) {
        showOptions2 = true; // Hide options for Shift-2
    }  if (currentHours <= 23) {
        showOptions3 = true; // Hide options for Shift-3
    }

    const submithandler=(e)=>{
        
         console.log("get time",time)
         navigate(`/${location}/${service}/${time}/specifictime`)
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

    console.log("get time",time)



    return(

        <div className="Jackfruit" style={{ height: '140vh' }}>
        <div className="Plum">
            <MetaData title={'choose time'}/>
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
       
      
       
       <form   onSubmit={submithandler} className='Cherry'>
       <h1>Choose your Time slot</h1> <br/><br/>

       
         <br/><br/>

         <div className='Dragonfruit'>
                    <select 
                         onChange={(e) => setTime(e.target.value)}
                         value={time}
                         name="time">
                          {showOptions1 &&  <option value="01 to 09">Shift-1 01 am to 09 am </option>}
                           {showOptions2 && <option value="09 to 17">Shift-2 09 am to 05 pm</option>}
                          {showOptions3 &&  <option value="17 to 23">Shift-3 05 pm to 11 pm</option>}
                            
                         </select>
                    

              </div>


         
         
         <br></br>
         
         <button type="submit"  className="Starfruit">Continue</button><br></br><br/>
        
       </form>
     
        </div>
        </div>
        </div>     

       

    )
}