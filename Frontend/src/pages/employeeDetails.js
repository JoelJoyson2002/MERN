import { useEffect } from 'react';
import './employeeDetails.css';
import { getEmployee } from '../actions/employeeAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StarRating from './starrating';
import MetaData from '../MetaData';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FadeLoader from "react-spinners/FadeLoader";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import CustomDropdown from './customdropdown';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { addCartItem } from '../actions/cartActions';


const EmployeeDetails = () => {
  const{user,isAuthenticated}=useSelector(state=>state.authState);
  const [showLoading, setShowLoading] = useState(true);
 
  
  const navigate=useNavigate();

    const dispatch=useDispatch();
    
    const{loading,employeeById}=useSelector((state)=>{
        return state.employeeState
});
    //console.log(employeeById);
    const{id,timeslot}=useParams();
console.log("id",id)

console.log("emp",employeeById)
//console.log("path",employeeById.images[0].Filename.split("/"))


const submithandler=(e)=>{
  e.preventDefault();
  dispatch(addCartItem(employeeById._id,1))
  
  navigate(`/booking/${employeeById._id}/${timeslot}`)
}



 
useEffect(() => {
  // Simulating a loading process
  return
}, []);

 



    useEffect(()=>{
        if (!employeeById) {
            
            dispatch(getEmployee(id));
          }
        
           
    },[dispatch,employeeById])

    

    

       
  useEffect(()=>{
    dispatch(getEmployee(id))
  },[id,isAuthenticated])
    
    if(!employeeById  ){
        return 
    }
    else{
        console.log("employeeById",employeeById);
        
        
        
        
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


    

    
   
   
    

    

  
  
    /*const prevEmployeeById = useRef(null);
// Update the ref when employeeById changes
useEffect(() => {
  prevEmployeeById.current = employeeById;
}, [employeeById]);

useEffect(() => {
  if (!employeeById) {
    dispatch(getEmployee(id));
  }
}, [id, dispatch, employeeById]);

// Conditional rendering based on the availability of employeeById
if (!employeeById || employeeById === prevEmployeeById.current) {
  return (
    // ... (render loading or no data message)
    <h1>Hello</h1>
  );
}

// If employeeById is available and different from the previous value, render the employee details
console.log('employeeById', employeeById);*/

 console.log("isSutttt",isAuthenticated)
 let path=employeeById.images[0].Filename.split("/");
 console.log("lio",path[path.length-1])
 
    
  return (

    

    <div className="K1" style={{ height: '140vh' }}>
    <div className="J1">

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
        
        /*<li><Link to={`/signup`}>Signup/Login</Link></li>*/
        <Navigate to="/login"/>


}
         </ul>
    </div>
    
    </div>
    <div className="employee-details-container">
      <div className="image-container">
        {/*<img src={`/images/${employeeById.images[0].Filename}`} alt="not found" />*/}
        <img src={`/images/${path[path.length-1]}`} alt="not found"/>
      </div>

      <div className="info">
        <span className="name">{employeeById.name}</span><br />
        
        <div className="details">Details</div><br />
        <div className="align">
        <span className="age" ><span style={{color:'blue'}}>Age: </span> {employeeById.age}</span><br />
        <span className="empid"><span style={{color:'blue'}}>Empid: </span> {employeeById._id}</span><br />
        <div className="charge"><span style={{color:'blue'}}>Service-Charge: </span>Rs.{employeeById.serviceCharge}</div><br />
        <span className="experience"><span style={{color:'blue'}}>Experience: </span> {employeeById.experience} years</span><br />
        <span className="contacts"><span style={{color:'blue'}}>Phone:</span> {employeeById.contact}</span><br />
        <span className="email"><span style={{color:'blue'}}>Email: </span> {employeeById.email}</span><br />
        <span className="type"><span style={{color:'blue'}}>Service type: </span> {employeeById.service_type}</span><br />
        <span className="type"><span style={{color:'blue'}}>Service Needed at: </span> {timeslot}:00</span><br />
        <span className="company"></span><br />
        
       
       {/* <div className="stars"><span style={{color:'blue'}}>Rating:  </span> <StarRating arg={employeeById.star_rating}/></div>
        <span className="reviews"><span style={{color:'blue'}}>Number-of-Reviews: </span>{employeeById.numofreviews}</span><br />*/}
        <button onClick={submithandler} className="book">Book</button>
        

        </div>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default EmployeeDetails;
