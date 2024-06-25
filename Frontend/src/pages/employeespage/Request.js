import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './Request.css'


import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import CustomDropdown from './EmployeeCustomDropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Employeelogin , clearEmployeeAuthError} from '../../actions/authEmployeeAction';
import { clearLoginError } from '../../slices/authEmployee';
import EmployeeCustomDropdown from './EmployeeCustomDropdown';
import { EmployeeOrders } from '../../actions/orderActions';


export default function Request(){

    
   // const{isAuthenticatedEmployee,employee,error}=useSelector(state=>state.authEmployeeState)
   const { isAuthenticatedEmployee, employee, error } = JSON.parse(localStorage.getItem('authEmployeeState'));
    console.log("isAuth",isAuthenticatedEmployee)
    

    const{ EmployeeBook}=useSelector(state=>state.orderState)
   


    
    const navigate=useNavigate();

    const dispatch=useDispatch()


    
   

    useEffect(()=>{
        dispatch(EmployeeOrders)
       

    },[dispatch])


   

    

    






   

   
        /*if(!employee){
     
            return (
              <div className="loading">
                Loading...<br />
                <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
                <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login/employee'); }}>Click here to go to login page</button>
                
              </div>
            );
           
          
        }*/

        if(!EmployeeBook) return
       
        
       
        
      console.log("employyebook",EmployeeBook)
     
      
let desiredEmployeeId=null;
    
  console.log("employee",employee)
  if(employee){
   desiredEmployeeId = employee._id;


  }

  

   
    
    
    


     

    
    
    
    

    
  
  
    
   




    return(

        <div className="Custardapple" style={{ height: '140vh' }}>
        <div className="Strawberry">
            <MetaData title={'see request'}/>
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
           {isAuthenticatedEmployee?
              
              <div className="afterlogin">

        <EmployeeCustomDropdown />
</div>

              
        :

           navigate('/login')

}
           
        
        


     </ul>

</div>
</div>
       
      
 {/* Filter EmployeeBook based on specific employeeId */}

 {/*{EmployeeBook.map(booking => (
            <div key={booking._id}>
              <p>Booking ID: {booking._id}</p>
              <p>Booking Status: {booking.bookingstatus}</p>
              }
            </div>
          ))}*/}

{/*{EmployeeBook.filter(booking =>
    booking.booktheprovider.some(provider => provider.employee === desiredEmployeeId)
  ).map(booking => (
    <div key={booking._id}>
      <p>Booking ID: {booking._id}</p>
      <p>Booking Status: {booking.bookingstatus}</p>
     
    </div>
  ))}*/}

  
<div className='Kale'>
           <table className="Artichoke">
            <thead>
                <tr>
                    <th>Booking Id</th>
                    <th>Booking Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>



                {EmployeeBook.filter(booking =>
              booking.booktheprovider.some(provider => provider._id === desiredEmployeeId)
            ).map(booking => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.bookingstatus}</td>
                {/* Add more table cells for other properties */}
                <td><Link to={`/getUser/${booking.user}/${booking._id}`}>Edit Order</Link></td>
              </tr>
            ))}
      </tbody>

           </table>
           </div>

           
 
     
        </div>
        </div>
        </div>     

       

    )
}




