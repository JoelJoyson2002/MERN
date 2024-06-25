
import './payment.css'
import { CardNumberElement,CardExpiryElement,CardCvcElement } from '@stripe/react-stripe-js';
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
import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { orderCompleted } from '../slices/cartSlice';
import {createOrder} from '../actions/orderActions';
import { clearAuthError } from '../actions/userAction';
import { clearError as clearOrderError } from '../slices/orderSlice';
export default function Payment(){
    const{timeslot,empid}=useParams();
    const stripe=useStripe();
    const elements=useElements();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const orderInfo=JSON.parse(sessionStorage.getItem('orderInfo'))
    const {items:cartItems,shippingInfo}=useSelector(state=>state.cartState)
    const{error:orderError,orderDetail:detail}=useSelector(state=>state.orderState)
    const{user,isAuthenticated}=useSelector(state=>state.authState);
    const{loading,employeeById}=useSelector((state)=>{
        return state.employeeState
    });

    console.log("employeeByid",employeeById)
    const post=shippingInfo.postal_code;
    console.log("sit",cartItems)
    console.log("shipping Info",shippingInfo)
    const currentdate=new Date();
    const curr=currentdate.toDateString()
    
    /*const paymentData={
        amount:orderInfo.serviceCharge,
        shipping:{
            name:user.name,
            address:{
                line1: shippingInfo.address ,
                
                postalcode:shippingInfo.postalcode   ,
            },
            phone:shippingInfo.phone
        }
    }*/
    console.log("pppost",post)
    useEffect(()=>{
        
        if(orderError){
            toast(orderError,{
                position:toast.POSITION.BOTTOM_CENTER,
                type:'error',
                onOpen:()=>{dispatch(clearOrderError())}
            })
            return
        }
    })

    useEffect(()=>{
        
        if (!employeeById) {
            
            dispatch(getEmployee(empid));
          }
        
           
    },[dispatch,employeeById])
    
    if(!employeeById){
      return
    }
    if(!orderInfo ) return;
    if(!detail) return;
    if(cartItems==[]) return;

    if(!shippingInfo) {
        return ;
    }

    console.log("cartitems",cartItems)
    
    const paymentData={
       
        amount:orderInfo.serviceCharge,
        //amount:400,
        shipping:{
            name:user.name,
            
            
            address:{
                city:"Coimbatore",
                postal_code:shippingInfo.postalcode,
                
                country:"United States",
                
                line1:shippingInfo.address,
                line2:"13/3 Nehru  nagar"
                
                
               
                
            },
            phone:shippingInfo.phone
    
        }
    }
    console.log(paymentData)
    const order={
        //orderItems:cartItems,
        //booktheprovider:cartItems,
        booktheprovider:employeeById,
        shippingInfo,
        user:user._id,
        //service_type:cartItems[0].service_type,
        service_type:employeeById.service_type,
        timeslot:timeslot,
        Dates:curr
        
       
    }
    console.log("uporder",order)
    
   
    if(orderInfo){
        order.serviceCharge=orderInfo.serviceCharge;
        order.timeslot=timeslot
       
    }
    console.log("new order",order)
   
    
    

    const submithandler=async(e)=>{
        e.preventDefault();
        document.querySelector('.Ribs').disabled=true;
        try{
            console.log("paymentDta",paymentData)
            const{data}=await axios.post('/api/v1/payment/process',paymentData)
            console.log("daaata",data)
            const clientSecret=data.client_secret
            const result=await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                       email:user.email,
                       address:{
                        line1: "23 Ger",
                        line2: "we3",
                        city: "Coim",
                        country: "us",
                        postal_code: "32",
                        state: "Tamil Nadu",
                       }
                        
                    }
                }
            })
            console.log("result",result)
            if(result.error){
                toast( (await result).error.message,{
                    type:'error',
                    position:toast.POSITION.BOTTOM_CENTER
                })
                document.querySelector('.Ribs').disabled=false;
            }else{
                if(( await result).paymentIntent.status==='succeeded'){
                     toast("Payment Success",{
                         type:"success",
                         position:toast.POSITION.BOTTOM_CENTER
                     })
                     order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                     }
                     console.log("orderinpayment",order)
                     console.log("lio")
                     dispatch(orderCompleted())
                     dispatch(createOrder(order))
                     console.log("hello")
                     navigate('/order/success')
                }
                else{
                    toast("Please Try Again!",{
                        type:"error",
                        position:toast.POSITION.BOTTOM_CENTER
                    })
                }
            }
        }
        catch(error){

        }
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
  

    return(
        
    <div className="Hip" style={{ height: '140vh' }}>
    <div className="Waist">

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
    
    <form  onSubmit={submithandler} className='Chest'>
       <h1>Card Info</h1> <br/><br/>

       <label className="Shoulder">Card Number</label>
         <CardNumberElement type="text"  name="cardnumber"   required
          
         />
         <br/><br/>

         <label className="Arms">Card Expiry</label>
         <CardExpiryElement type="text"  name="cardexpiry" required
          
         />
         <br/><br/>

         <label className="Biceps">Card CVC</label>
         <CardCvcElement type="number"  name="cardcvc"  required
          
         />
         <br/><br/>


         
         
         
         
         <button type="submit"  className="Ribs">Pay-{`Rs.${orderInfo && orderInfo.serviceCharge}`}</button><br></br><br/>
        
       </form>
    
    </div>
    </div>
    </div>
    )
}