import './orderSuccess.css'
import { CardNumberElement,CardExpiryElement,CardCvcElement } from '@stripe/react-stripe-js';
import { useEffect } from 'react';

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
import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { orderCompleted } from '../slices/cartSlice';
import { ChangeorderDetail } from '../actions/orderActions';


export default  function OrderSuccess(){

    const{isAuthenticated}=useSelector(state=>state.authState)
    const{orderDetail}=useSelector(state=>state.orderState);
    const{ChangedOrder}=useSelector(state=>state.orderState);
    const dispatch=useDispatch()

  

   
    //console.log("orderDetail",orderDetail.booktheprovider[0]._id)
    console.log("orderDetail-time",orderDetail)
    

    /*if(orderDetail!={}){
        console.log("orderDetail",orderDetail.booktheprovider[0]._id)
    }*/
    /*useEffect(() => {
       
            if (orderDetail!={}) {
                console.log("hello")
                dispatch(ChangeorderDetail(orderDetail.booktheprovider[0]._id, orderDetail.time));
            
        };

       

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, orderDetail]);*/
    useEffect(() => {
        if (orderDetail && orderDetail.booktheprovider && orderDetail.booktheprovider.length > 0) {
            console.log("hello")
            dispatch(ChangeorderDetail(orderDetail.booktheprovider[0]._id, orderDetail.timeslot));
        }
    }, [dispatch, orderDetail]);


    console.log(ChangedOrder)
    return(
        
    <div className="Neck" style={{ height: '140vh' }}>
    <div className="Apple">

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

        <div className="Face">
            <img src="/images/success.png" className='Chin' alt="not found"></img>
            <div className="Jaw">
                 Your Booking has been done SuccessFully.
                
            </div>
                <div className="Ears">
                    <br></br>
                    <Link to="/orders">Go to bookings</Link>
                </div>
        </div>
   
    </div>
    </div>
   
  );
};

    
