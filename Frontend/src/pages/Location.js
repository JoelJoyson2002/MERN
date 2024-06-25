import MetaData from '../MetaData';
import './location.css';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';

import { useState } from 'react';

 
import  {useDispatch, useSelector}   from 'react-redux';
import { getEmployees } from '../actions/employeesActions';
import { Dropdown,DropdownButton,Image } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import CustomDropdown from './customdropdown'; 
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";





const Locations=()=>{
     const{user,isAuthenticated}=useSelector(state=>state.authState);
     const navigate = useNavigate();
     const handleServiceClick = (service) => {
          navigate(`/chooseservices/${service}`);
        };

        if(!isAuthenticated){
     
          return (
            <div className="loading">
              Loading...<br />
              <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
              <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
              
            </div>
          );
        
      }
     
     if(!user){
          return;
         
       }
  

    return(
        <>
        <div className="G">
          <MetaData title={'choose location'}/>
                
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
           
           <Navigate to='/login'/>

}
           
     </ul>
</div>

</div>







       
        <div className="H">
                <h2>Choose the Location you want</h2><br></br><br></br>
             
              <div className="boxes">
                <div className="box-1" onClick={() => handleServiceClick('Chennai')}>
                     <span className="letters">Chennai</span>
                </div>
                <div className="box-2"onClick={() => handleServiceClick('Mumbai')}>
                     <span className="letters">Mumbai</span>
                </div>
                <div className="box-3" onClick={() => handleServiceClick('Delhi')}>
                     <span className="letters">Delhi</span>
                </div>
                <div className="box-4"onClick={() => handleServiceClick('Kolkata')}>
                     <span className="letters">Kolkata</span>
                </div>
                {/*<div className="box-5">
                     <span className="letters">Hyderabad</span>
    </div>*/}
                <div className="box-6" onClick={() => handleServiceClick('Karnataka')}>
                     <span className="letters">Karnataka</span>
                </div>

        </div>
    </div>
        </div>
      
        
        
        </>
        
    )
}

export default Locations;
