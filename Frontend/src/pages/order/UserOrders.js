import {MDBDataTable} from 'mdbreact';
import MetaData from '../../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userOrders as userOrderAction} from '../../actions/orderActions';
import { Link } from 'react-router-dom';
import './UserOrder.css'
/*import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";*/

//import { CardNumberElement,CardExpiryElement,CardCvcElement } from '@stripe/react-stripe-js';
//import { useEffect } from 'react';

//import { getEmployee } from '../actions/employeeAction';
//import { useDispatch, useSelector } from 'react-redux';
//import { useParams } from 'react-router-dom';
//import StarRating from './starrating';
//import MetaData from '../MetaData';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FadeLoader from "react-spinners/FadeLoader";
import { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useRef } from 'react';
import CustomDropdown from '../customdropdown';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { deleteOrders } from '../../actions/orderActions';

import { clearError } from '../../slices/orderSlice';
import { clearOrderDeleted } from '../../slices/orderSlice';
import { adminOrders as adminOrdersAction } from '../../actions/orderActions';




export default function UserOrders(){
    const{isAuthenticated}=useSelector(state=>state.authState)
    console.log("isAuth",isAuthenticated)
    const navigate=useNavigate();

    const{userOrders=[]}=useSelector(state=>state.orderState);

   
    const dispatch=useDispatch();
    useEffect(()=>{
   dispatch(userOrderAction)
    },[dispatch])
  
    
   
    
    
   

    //console.log("usert",userOrders.bookings[0].paymentInfo.id)
    console.log("user",userOrders)
    
   
   /* const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order Id",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: 'asc',
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },
            ],
            rows: [],
        };
    
        if (Array.isArray(userOrders)) {
            userOrders.forEach(userOrder => {
                data.rows.push({
                    id: userOrder._id,
                    amount: userOrder.serviceCharge,
                    actions: <Link to={`/order/${userOrder._id}`}>View Order</Link>,
                });
            });
        }
       
            
            console.log("oders",userOrders)
        
            
            
    
        return data;
    };*/

   

     return(
        
        <div className="Tomato" style={{ height: '220vh' }}>
        <div className="Potato">
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

        
          {/*<MetaData title="My Orders" />
            <div className="container mt-4">
                <h2 className="Black-hole">User Orders</h2>
                <MDBDataTable
                    className='px-3 custom-mdb-data-table'
                    bordered
                    striped
                    hover
                    pagination={false}  // Hide pagination
    searching={false}
    info={false} 
                    
                    data={setOrders()}
                />
            </div>
        
     */}
     <div className='Carrot'>
           <table className="Cauli">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Amount</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
        {userOrders.map((item) => (
          <tr key={item.id}>
            <td>{item._id}</td>
            <td>{item.serviceCharge}</td>
            <td><Link to={`/order/${item._id}`}>View Order</Link></td>
            
            {/* Add more cells based on your data structure */}
          </tr>
        ))}
      </tbody>

           </table>
           </div>
        
        
        </div>
        </div></div>
     )
}