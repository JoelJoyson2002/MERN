import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './Dashboard.css'

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import CustomDropdown from '../customdropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getAdminEmployees } from '../../actions/employeesActions';
import { userOrders as userOrderAction } from '../../actions/orderActions';
import { getUsers } from '../../actions/userAction';
import { adminOrders as adminOrdersAction } from '../../actions/orderActions';

export default function Dashboard(){
     const{isAuthenticated}=useSelector(state=>state.authState)
     const navigate=useNavigate();
     const{employee_details=[]}=useSelector(state=>state.employeesState);
     const{userOrders=[]}=useSelector(state=>state.orderState);
     const{users=[],loading=true,error,isUserDeleted}=useSelector(state=>state.userState);
     const{adminOrders=[],isOrderDeleted}=useSelector(state=>state.orderState)
    
    

     const dispatch=useDispatch();

     useEffect(()=>{
         dispatch(getAdminEmployees);
     },[dispatch])

     console.log("e",employee_details)

    useEffect(()=>{
        dispatch(adminOrdersAction)
         },[dispatch])

        useEffect(()=>{
            dispatch(getUsers)
             },[dispatch])

             

         
    

    

    return(
        <div className="Bitter" style={{ height: '140vh' }}>
        <div className="Beetroot">
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



<div >

              <div className='Garlic'>
                    <div className="Sidebar">
                        <Sidebar/>
                    </div>
                    <div >
                        
                        
                    </div>
               </div>
               
   


               <div className="Gooseberry">
    
       <div className="Cucumber">
            <div className="Turnip-1" >
            
                <span className="Ginger">Employees<br></br><br></br>{employee_details.length}</span>
            </div>
            <div className="Turnip-2" >
            
                <span className="Ginger">Bookings<br></br><br></br>{adminOrders.length}</span>
            </div>
            <div className="Turnip-3" >
            
                <span className="Ginger">Users<br></br><br></br>{users.length}</span>
            </div>
            {/*<div className="Turnip-4" >
            
                <span className="Ginger">Service Rejected</span>
</div>*/}
            
           
          

</div></div>


</div>

     





</div>
</div></div>


        
       
        
    )
}