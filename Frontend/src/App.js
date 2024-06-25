
import './App.css';
import Home from './pages/HomePage';
import Locations from './pages/Location';
import AboutUs from './pages/aboutus';
import ChooseService from './pages/chooseService';
import ContactUs from './pages/contactus';
import Login from './pages/login';
import Services from './pages/services';
import Signup from './pages/signup';
import Test from './test';

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import PlumbingChennai from './listofemployees/plumbingChennai';
import PlumbingMumbai from './listofemployees/plumbingMumbai';
import PlumbingDelhi from './listofemployees/plumbingDelhi';
import PlumbingKolkata from './listofemployees/plumbingKolkata';
import PlumbingKarnataka from './listofemployees/plumbingKarnataka';
import ElectricalChennai from './listofemployees/electricalChennai';
import ElectricalMumbai from './listofemployees/electricalMumbai';
import ElectricalDelhi from './listofemployees/electricalDelhi';
import ElectricalKolkata from './listofemployees/electricalKolkata';
import ElectricalKarnataka from './listofemployees/electricalKarnataka';
import SoftwarehandlerChennai from './listofemployees/softwarehandlerChennai';
import SoftwarehandlerMumbai from './listofemployees/softwarehandlerMumbai';
import SoftwarehandlerDelhi from './listofemployees/softwarehandlerDelhi';
import SoftwarehandlerKolkata from './listofemployees/softwarehandlerKolkata';
import SoftwarehandlerKarnataka from './listofemployees/softwarehandlerKarnataka';
import CleaningChennai from './listofemployees/cleaningChennai';
import CleaningMumbai from './listofemployees/cleaningMumbai';
import CleaningDelhi from './listofemployees/cleaningDelhi';
import CleaningKolkata from './listofemployees/cleaningKolkata';
import CleaningKarnataka from './listofemployees/cleaningKarnataka';
import PestcontrolChennai from './listofemployees/pestcontrolChennai';
import PestcontrolMumbai from './listofemployees/pestcontrolMumbai';
import PestcontrolDelhi from './listofemployees/pestcontrolDelhi';
import PestcontrolKolkata from './listofemployees/pestcontrolKolkata';
import PestcontrolKarnataka from './listofemployees/pestcontrolKarnataka';
import PlumberPartition from './partitions/plumberParttion';
import  {ToastContainer} from 'react-toastify';
import EmployeeDetails from './pages/employeeDetails';
import store from './store';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userAction';
import UserProfile from './pages/userprofile';
import ProtectedRoute from './pages/route/protectedroute';
import UpdateProfile from './pages/updateprofile';
import UpdatePassword from './pages/updatePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Booking from './pages/Booking';
import ConfirmOrder from './pages/ConfirmOrder';
import Payment from './pages/payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import axios from 'axios';
import OrderSuccess from './pages/orderSuccess';
import { useSelector } from 'react-redux';
import PP from './pages/pp';
import UserOrders from './pages/order/UserOrders';
import OrderDetail from './pages/order/OrderDetail';
import Dashboard from './pages/admin/Dashboard';
import EmployeeList from './pages/admin/EmployeeList';
import NewEmployee from './pages/admin/NewEmployee';
import UpdateEmployee from './pages/admin/UpdateEmployee';
import OrderList from './pages/admin/OrderList';
import UpdateOrder from './pages/admin/UpdateOrder';
import UserList from './pages/admin/UserList';
import UpdateUser from './pages/admin/UpdateUser';
import EmployeeLogin from './pages/employeespage/employeeLogin';
import Request from './pages/employeespage/Request';
import EmployeeOrderDetail from './pages/employeespage/EmployeeOrderDetail';
import EmployeeResponse from './pages/admin/EmployeeResponse';
import SelectTime from './pages/SelectTime';
import ChooseTime from './pages/choosetime';
import ExtractEmployee from './pages/extractEmployees';
import LocationsSecond from './pages/location-2';
import FeedbackForm from './pages/Feedback';
import ThankYouPage from './pages/Thankyou';
import GetAllFeedbacks from './pages/admin/getallfeedbacks';
import FeedbackById from './pages/admin/seeFeedbackbyid';


function App() {
  const[stripeApiKey,setStripeApiKey]=useState("");
  const{isAuthenticated} =useSelector(state=>state.authState);
useEffect(()=>{
  
  store.dispatch(loadUser)
  
  /*async function getStripeApiKey(){

    
      const{data}=await axios.get('/api/v1/stripeapi')
      console.log("datain ap",data)
      setStripeApiKey(data.stripeApiKey)
    
    
    
  }
  getStripeApiKey()*/
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get('/api/v1/stripeapi', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming you are storing the token in localStorage
        },
      });
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error('Error fetching Stripe API key:', error);
    }
  }
  getStripeApiKey()
  
},[])


  
  return (
    <Router>
    <div className="App">
      <HelmetProvider>
         <ToastContainer theme='dark'/>
       <Routes>

            <Route path='/' element={<Home/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/ourservices' element={<Services/>}/>
            <Route path='/contactus' element={<ContactUs/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/locations' element={<Locations/>}/>
            <Route path='/loc' element={<LocationsSecond/>}/>
            <Route path='/chooseservices/:location' element={<ChooseService/>}/>
            <Route path='/chennaiplumbing' element={<PlumbingChennai/>}/>
            <Route path='/mumbaiplumbing' element={<PlumbingMumbai/>}/>
            <Route path='/delhiplumbing' element={<PlumbingDelhi/>}/>
            <Route path='/kolkataplumbing' element={<PlumbingKolkata/>}/>
            <Route path='/karnatakaplumbing' element={<PlumbingKarnataka/>}/>
            <Route path='/chennaielectrical' element={<ElectricalChennai/>}/>
            <Route path='/mumbaielectrical' element={<ElectricalMumbai/>}/>
            <Route path='/delhielectrical' element={<ElectricalDelhi/>}/>
            <Route path='/kolkataelectrical' element={<ElectricalKolkata/>}/>
            <Route path='/karnatakaelectrical' element={<ElectricalKarnataka/>}/>
            <Route path='/chennaisoftwarehandler' element={<SoftwarehandlerChennai/>}/>
            <Route path='/mumbaisoftwarehandler' element={<SoftwarehandlerMumbai/>}/>
            <Route path='/delhisoftwarehandler' element={<SoftwarehandlerDelhi/>}/>
            <Route path='/kolkatasoftwarehandler' element={<SoftwarehandlerKolkata/>}/>
            <Route path='/karnatakasoftwarehandler' element={<SoftwarehandlerKarnataka/>}/>
            <Route path='/chennaicleaning' element={<CleaningChennai/>}/>
            <Route path='/mumbaicleaning' element={<CleaningMumbai/>}/>
            <Route path='/delhicleaning' element={<CleaningDelhi/>}/>
            <Route path='/kolkatacleaning' element={<CleaningKolkata/>}/>
            <Route path='/karnatakacleaning' element={<CleaningKarnataka/>}/>
            <Route path='/chennaipestcontrol' element={<PestcontrolChennai/>}/>
            <Route path='/mumbaipestcontrol' element={<PestcontrolMumbai/>}/>
            <Route path='/delhipestcontrol' element={<PestcontrolDelhi/>}/>
            <Route path='/kolkatapestcontrol' element={<PestcontrolKolkata/>}/>
            <Route path='/karnatakapestcontrol' element={<PestcontrolKarnataka/>}/>


            <Route path='/feedback/:bookid' element={<FeedbackForm/>}/>
            <Route path='/thankyou' element={<ThankYouPage/>}/>
           {/* <Route path='/plumberpartition' element={<PlumberPartition/>}/>*/}

            <Route path='/emp/empid/:id/:timeslot' element={<EmployeeDetails/>}/>
            <Route path='/userprofile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
            <Route path='/userprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
            <Route path='/changepassword' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
            <Route path='/password/forgot' element={<ForgotPassword/>}/>
            <Route path='/password/reset/:token' element={<ResetPassword/>}/>

            <Route path='/booking/:empid/:timeslot' element={<Booking/>}/>

            <Route path='/confirm/order/:empid/:timeslot' element={<ConfirmOrder/>}/>

             
             {stripeApiKey &&
            <Route path='/payment/:empid/:timeslot' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute>}/>}

<Route path='/order/success' element={<OrderSuccess/>}/>

<Route path='/payment' element={<PP/>}/>
<Route path=':location/:service/time' element={<ProtectedRoute><SelectTime></SelectTime></ProtectedRoute>}/>
<Route path='/:location/:service/:timeslot/specifictime' element={<ProtectedRoute><ChooseTime></ChooseTime></ProtectedRoute>}/>
<Route path='/:location/:service/:timeslot/emp' element={<ProtectedRoute><ExtractEmployee></ExtractEmployee></ProtectedRoute>}/>

<Route path='/orders' element={<ProtectedRoute><UserOrders></UserOrders></ProtectedRoute>}/>
<Route path='/order/:id' element={<ProtectedRoute><OrderDetail></OrderDetail></ProtectedRoute>}/>

<Route path='/login/employee' element={<EmployeeLogin/>}/>
<Route path='/employee/request' element={<Request/>}/>
<Route path='/getUser/:userid/:bookid' element={<EmployeeOrderDetail/>}/>
<Route path='/admin/employeeresponse' element={<EmployeeResponse/>}/>

            
           

       </Routes>

       <Routes>
       <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
       <Route path='/admin/employees' element={<ProtectedRoute isAdmin={true}><EmployeeList/></ProtectedRoute>}/>
       <Route path='/admin/employees/create' element={<ProtectedRoute isAdmin={true}><NewEmployee/></ProtectedRoute>}/>
       <Route path='/admin/employee/:id' element={<ProtectedRoute isAdmin={true}><UpdateEmployee/></ProtectedRoute>}/>
       <Route path='/admin/orders/' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>}/>
       <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>}/>
       <Route path='/admin/users/' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute>}/>
       <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>}/>
       <Route path='/admin/allfeedbacks/' element={<ProtectedRoute isAdmin={true}><GetAllFeedbacks/></ProtectedRoute>}/>
       <Route path='/feedbacks/:_id' element={<ProtectedRoute isAdmin={true}><FeedbackById/></ProtectedRoute>}/>
       </Routes>
       </HelmetProvider>
       
      
      
    </div>
    </Router>
  );
}

export default App;
