import MetaData from '../MetaData';
import '../pages/plumbingKolkata.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEmployees } from '../actions/employeesActions';
import PlumberKolkataPartition from '../partitions/plumberKolkataPartition';


import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FadeLoader from "react-spinners/FadeLoader";

import { Link } from 'react-router-dom';
import CustomDropdown from '../pages/customdropdown';
import { Navigate } from 'react-router-dom';


const PlumbingKolkata=()=>{

  const{isAuthenticated}=useSelector(state=>state.authState);
  
  
  const dispatch=useDispatch();
  const {employee_details,loading}=useSelector((state)=>
    
       state.employeesState
    )

    
    useEffect(() => {
      // Check if employee_details is undefined before dispatching
      if (!employee_details) {
        dispatch(getEmployees);
      }
      
    }, [dispatch, employee_details]);
  
    // Check if employee_details is undefined before rendering
    if (!employee_details) {
      return (<div className="loading" >Loading...<br/>
      <FadeLoader
        color="orange"
        //loading={loading}
        className="custom-clip-loader"
        size={150}
        
        //aria-label="Loading Spinner"
        //data-testid="loader"
      />
      </div>
      )
    
    }
  
    // If employee_details is defined, render the component
    const filtered = employee_details.filter(
      (obj) => obj.service_type === 'plumber' && obj.location === 'Kolkata'
    );
    
    console.log("filtered details",filtered)
    if(filtered.length>0){
    toast.success("successfully fetched",{
      position:toast.POSITION.BOTTOM_CENTER
    })
  }
  else{
         toast("No data found",{
          position:toast.POSITION.BOTTOM_CENTER
         })
  }
    // Check if employee_details is defined before rendering
  


    
    
    
   

    /*const filtered=kio.filter((obj)=>
      obj.service_type==='plumber' && obj.location==='Chennai'
    )*/
    return(
         <div className="N">

<MetaData title={'chooseProvider'}/>
    
                          
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
    {/*

  <div className='partition-container'>

    <div className="partition-1">

             <img src="/images/plumberKolkata-1.jpg" className="image2" alt ="not found"></img>
             <span className="name">Mr.Evans</span><br></br>
             <span className="age">age:31</span><br></br>
             <div class="rating">
  <div class="star-46">&#9733;</div> 
  <div class="star-47">&#9733;</div>
  <div class="star-48">&#9733;</div>
  <div class="star-49">&#9733;</div>
  <div class="star-50">&#9733;</div>
</div>

    <span className="rating">(13 Reviews)</span>
    <button className="b1">View Details</button>

    </div>



    
    <div className="partition-2">

             <img src="/images/plumberKolkata-2.jpg" className="image3" alt ="not found"></img>
             <span className="name">Mr.Bruce</span><br></br>
             <span className="age">age:32</span><br></br>
             <div class="rating-2">
  <div class="star-51">&#9733;</div> 
  <div class="star-52">&#9733;</div>
  <div class="star-53">&#9733;</div>
  <div class="star-54">&#9733;</div>
  <div class="star-55">&#9733;</div>
</div>

    <span className="rating-2">(5 Reviews)</span>
    <button className="b2">View Details</button>

    </div>


     
    <div className="partition-3">

             <img src="/images/plumberKolkata-3.jpg" className="image4" alt ="not found"></img>
             <span className="name">Mr.Mcqueen</span><br></br>
             <span className="age">age:30</span><br></br>
             <div class="rating-3">
  <div class="star-56">&#9733;</div> 
  <div class="star-57">&#9733;</div>
  <div class="star-58">&#9733;</div>
  <div class="star-59">&#9733;</div>
  <div class="star-60">&#9733;</div>
</div>

    <span className="rating-3">(10 Reviews)</span>
    <button className="b3">View Details</button>

    </div>




</div>

         </div>


    )
}
*/}

<div className="partition-container">
        {filtered.map((plumber, index) => (
          <PlumberKolkataPartition key={index} plumber={plumber} />
        ))}
      </div>
    </div>
  );
};




export default PlumbingKolkata;