
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './EmployeeOrder.css'


import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import CustomDropdown from './EmployeeCustomDropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';

import { Employeelogin , clearEmployeeAuthError} from '../../actions/authEmployeeAction';
import { clearLoginError } from '../../slices/authEmployee';
import EmployeeCustomDropdown from './EmployeeCustomDropdown';
import { EmployeeOrders } from '../../actions/orderActions';
import { useParams } from 'react-router-dom';
import { getUser } from '../../actions/userAction';
import { getuserbyemp } from '../../actions/getuserbyempAction';
import { SendFeedback, empresponse } from '../../actions/empresponseAction';
import { clearEmpresponseCreated, clearError, clearFeedbackCreated, clearFeedbackError } from '../../slices/employeeResponseSlice';


export default function EmployeeOrderDetail(){

    
   // const{isAuthenticatedEmployee,employee,error}=useSelector(state=>state.authEmployeeState)
   const { isAuthenticatedEmployee, employee, error } = JSON.parse(localStorage.getItem('authEmployeeState'));
    console.log("isAuth",isAuthenticatedEmployee)
    const{ EmployeeBook}=useSelector(state=>state.orderState)
    const{loading,userData}=useSelector(state=>state.getuserbyempState)

    const{error:empreserror, isResponseSent,empres}  =useSelector(state=>state.empresponseState)
    console.log("empres",empres)

    const{feedbackLinkSent,error:feedbackerror}=useSelector(state=>state.empresponseState)

    const[empavail,setEmpavail]=useState("Available");


    

    
   
  const{userid,bookid}=useParams();
  console.log("userid",userid)


    
    const navigate=useNavigate();

    const dispatch=useDispatch();

   
   const submithandler=(e)=>{
    e.preventDefault();
    dispatch(empresponse(bookid,empavail))
   
    
    
    

  }

  const Mail=(e)=>{
    e.preventDefault();
    console.log("emailll",userData.email)
    dispatch(SendFeedback(userData.email,bookid))
   
    
    
    

  }

  useEffect(()=>{
    if(isResponseSent){
        //localStorage.setItem('EmployeeResponseState', JSON.stringify({ error:empreserror, isResponseSent,empres }));
       toast("Response Sent to admin Successfully ",{
         type:'success',
         position:toast.POSITION.BOTTOM_CENTER,
         onOpen:()=>dispatch(clearEmpresponseCreated())
       })
       
       return;
    }
    if(error){
     toast(error,{
         type:'error',
         position:toast.POSITION.BOTTOM_CENTER,
         onOpen:()=>dispatch(clearError())
       })
       return;
    }
 
 },[isResponseSent,empreserror,dispatch])


 useEffect(()=>{
  if(feedbackLinkSent){
      //localStorage.setItem('EmployeeResponseState', JSON.stringify({ error:empreserror, isResponseSent,empres }));
     toast("Feedback link sent to user Successfully ",{
       type:'success',
       position:toast.POSITION.BOTTOM_CENTER,
       onOpen:()=>dispatch(clearFeedbackCreated())
     })
     
     return;
  }
  if(error){
   toast(error,{
       type:'error',
       position:toast.POSITION.BOTTOM_CENTER,
       onOpen:()=>dispatch(clearFeedbackError())
     })
     return;
  }

},[feedbackLinkSent,feedbackerror,dispatch])


    
   

    useEffect(()=>{
        dispatch(getuserbyemp(userid))
        dispatch(EmployeeOrders)
       

    },[dispatch])

    //
console.log("userData",userData)
console.log("empbook",EmployeeBook)


    if(!userData ) return;
    if(!EmployeeBook) return;
    
    let desiredEmployeeId=null;
    
  console.log("employeebook",EmployeeBook)
  if(employee){
   desiredEmployeeId = employee._id;


  }



    console.log("userdataemail",userData.email)


   

    

    






   

   
        
        
       
        
       
        
      
     
      


  

   
    
    
    


     

    
    
    
    

    
  
  
    
   
let bookingstatus="";



    return(

        <div className="Fig" style={{ height: '140vh' }}>
        <div className="Chiku">
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
       
      
     
     <div className='Avacado'>
            <h2>User Information</h2>
            <p><span className="info-label">Name:</span> <span className="info-value">{userData.name}</span></p>
            <p><span className="info-label">Role:</span> <span className="info-value">{userData.role}</span></p>
            <p><span className="info-label">Email:</span> <span className="info-value">{userData.email}</span></p>
            
        </div>


        <div className='Guava'>
            {EmployeeBook.filter(booking =>
               // booking.some(provider => provider.employee === desiredEmployeeId)
               booking._id===bookid
            ).map(booking => (
                <div key={booking._id}>
                    <p className="address">Address: {booking.shippingInfo.address}</p>
                    <p className="phone">Phone: {booking.shippingInfo.phone}</p>
                    <p className="postal-code">Postal Code: {booking.shippingInfo.postalcode}</p>
                    <p> Service Needed at:{booking.timeslot}:00</p>
                    <p> Booked at: {booking.Dates}</p>
                    <p>Booking Status:{bookingstatus=booking.bookingstatus}</p>
                </div>
            ))}
            </div>

            <br></br>


            <div className='Papaya'>
                    <select 
                         onChange={e=>setEmpavail(e.target.value)}
                         value={empavail}
                         name="empavail">
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                            
                         </select>
                    <button disabled={loading} onClick={submithandler}className="Pear">Send to Admin</button>
                   {bookingstatus=="Accepted"?<button disabled={loading} onClick={Mail} className="Almond">Send Feedback link to user </button>:""} 

              </div>

            

               
                
    

  


           
 
     
        </div>
        </div>
        </div>     

       

    )
}





