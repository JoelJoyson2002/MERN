import MetaData from '../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEmployees } from '../actions/employeesActions';
import PlumberPartition from '../partitions/plumberParttion';
import '../pages/plumbingChennai.css';


import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FadeLoader from "react-spinners/FadeLoader";
import { Link } from 'react-router-dom';
import CustomDropdown from '../pages/customdropdown';
import { Navigate } from 'react-router-dom';

const PlumbingChennai=()=>{
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
      (obj) => obj.service_type === 'plumber' && obj.location === 'Chennai'
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
         <div className="K">

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

             <img src="/images/plumberChennai-1.jpeg" className="image2" alt ="not found"></img><br></br>
             <span className="name">{filtered[0].name}</span><br></br>
             <span className="age">{filtered[0].age}</span><br></br>
             <div class="rating">
  <div class="star-1">&#9733;</div> This is an HTML character entity code. It represents a specific character or symbol. In this case, &#9733; corresponds to the character ★, which is a filled star.
  <div class="star-2">&#9733;</div>
  <div class="star-3">&#9733;</div>
  <div class="star-4">&#9733;</div>
  <div class="star-5">&#9733;</div>
</div>

    <span className="rating"></span><br></br>
    <button className="b1">View Details</button>

    </div>



    
    <div className="partition-2">

             <img src="/images/plumberChennai-2.jpeg" className="image3" alt ="not found"></img><br></br>
             <span className="name">{filtered[1].name}</span><br></br>
             <span className="age">age:32</span><br></br>
             <div class="rating-2">
  <div class="star-6">&#9733;</div> This is an HTML character entity code. It represents a specific character or symbol. In this case, &#9733; corresponds to the character ★, which is a filled star.
  <div class="star-7">&#9733;</div>
  <div class="star-8">&#9733;</div>
  <div class="star-9">&#9733;</div>
  <div class="star-10">&#9733;</div>
</div>

    <span className="rating-2">(6 Reviews)</span>
    <button className="b2">View Details</button>

    </div>


     
    <div className="partition-3">

             <img src="/images/plumberChennai-3.jpg" className="image4" alt ="not found"></img><br></br>
             <span className="name">{filtered[2].name}</span><br></br>
             <span className="age">age:30</span><br></br>
             <div class="rating-3">
  <div class="star-11">&#9733;</div> This is an HTML character entity code. It represents a specific character or symbol. In this case, &#9733; corresponds to the character ★, which is a filled star.
  <div class="star-12">&#9733;</div>
  <div class="star-13">&#9733;</div>
  <div class="star-14">&#9733;</div>
  <div class="star-15">&#9733;</div>
</div>

    <span className="rating-3">(4 Reviews)</span>
    <button className="b3">View Details</button>

    </div>




</div>

         </div>


    )
}



*/}
<div className="partition-container">
        {filtered.map((plumber, index) => (
          <PlumberPartition key={index} plumber={plumber} />
        ))}
      </div>
    </div>
  );
};

export default PlumbingChennai;