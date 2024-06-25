

import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';

import './choosetime.css'
import { getEmployee } from '../actions/employeeAction';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { clearAuthError, forgotPassword } from '../actions/userAction';
import CustomDropdown from './customdropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";
import { clearLocalStorage, saveShippingInfo } from '../slices/cartSlice';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function ChooseTime(){

    const{loading,error,user,message,isAuthenticated}=useSelector(state=>state.authState);
    const navigate=useNavigate();

    
    const{timeslot,location,service}=useParams();
    const [currentTime, setCurrentTime] = useState(new Date());

    const currentHours = currentTime.getHours();

    console.log("timeslot",timeslot)

    const a=timeslot.split(" ");
    let start=parseInt(a[0]);
    let end=parseInt(a[2])-1;

   

    //const [start, end] = timeslot.split(" ").map(time => parseInt(time));
    console.log(start);
    console.log(end);

    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    // Effect to update current hour every hour
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHour(new Date().getHours());
        }, 3600000); // Update every hour
        return () => clearInterval(interval);
    }, []);

    // Function to generate time slots
    const generateTimeSlots = () => {
        const timeSlots = [];
        for (let i = start; i <= end; i++) {
            console.log("aka")
            if (currentHour < i) {
                console.log("ok")
                const time = i < 10 ? `0${i}:00` : `${i}:00`; // Formatting time as "hh:00"
                timeSlots.push(
                    <Link key={time} to={`/${location}/${service}/${i.toString()}/emp`} className="time-slot" style={{ textDecoration: 'none',color: 'inherit'  }}>
                    {time}
                </Link>
                );
            }
        }
        return timeSlots;
    };
    
    if(!isAuthenticated){
     
        return (
          <div className="loading">
            Loading...<br />
            <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
            <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
            
          </div>
        );
      
    }

    console.log("current hour",currentHour)
    



    return(

        <div className="Passionfruit" style={{ height: '140vh' }}>
        <div className="Waterapple">
            <MetaData title={'choose time'}/>
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

<div className="time-slots">
    <h1 className='time-slot-1'>Choose the specific time</h1><br></br>
                        {/* Generate time slots */}
                        {generateTimeSlots()}
                    </div>
       
      
       
       
     
        </div>
        </div>
        </div>     

       

    )
}