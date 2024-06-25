
import MetaData from '../MetaData';
import './aboutus.css'
import { Link } from 'react-router-dom';
import CustomDropdown from './customdropdown';
import  {useDispatch, useSelector}   from 'react-redux';
const AboutUs=()=>{

    const{user,isAuthenticated}=useSelector(state=>state.authState);

    return(
        <div className="C">
            <MetaData title={'About us'}>
               
            </MetaData>
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
<div className="D">
                 <p> We provide Quality home services to the user. The user will get their serives at their door step.
                    We offer services at a low cost. It is totally a user friendly platform to make the life of people easier
                 </p>
          </div>

          <img src="/images/image5.jpg" className="plum" alt="not found"></img>

</div>
    </div>      


       
    )
}

export default AboutUs;