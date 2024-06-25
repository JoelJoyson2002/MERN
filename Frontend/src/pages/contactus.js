import MetaData from '../MetaData';
import './contactus.css'
import { Link } from 'react-router-dom';
import  {useDispatch, useSelector}   from 'react-redux';
import CustomDropdown from './customdropdown'; 
const ContactUs=()=>{
   const{user,isAuthenticated}=useSelector(state=>state.authState);

   return(
      

         <div className="E">
            <MetaData title={'ContactUs'}/>
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
        
        <li><Link to={`/signup`}>Signup/Login</Link></li>

}
           
     </ul>

</div>

</div>
    <div className="contact">
             <p> 
                
                <span className="con">Contact Information</span><br/><br/>

                  email : homeservice@gmail.com<br/>

                  Phone : 9875312221
                </p>
    </div>

</div>
           

         </div>

   )
    
}

export default ContactUs;