import MetaData from '../MetaData';
import './services.css';
import { Link } from 'react-router-dom';
import CustomDropdown from './customdropdown';
import  {useDispatch, useSelector}   from 'react-redux';
const Services = () => {
    const{user,isAuthenticated}=useSelector(state=>state.authState);
    return (
        <div className="B">
            <MetaData title={'services'}/>
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

        <div className="A">
            <h2 >Services We Provide</h2><br/><br/>
            <div className="service-box">
                <span className="service plumbing">Plumbing</span>
            </div>
            <div className="service-box">
                <span className="service electrical">Electrical-appliances</span>
            </div>
            <div className="service-box">
                <span className="service software">Software-devices-service</span>
            </div>
            <div className="service-box">
                <span className="service cleaning">Cleaning</span>
            </div>
            <div className="service-box">
                <span className="service pest-control">Pest-control</span>
            </div>
            {/*<div className="service-box">
                <span className="service ac-service">AC service</span>
            </div>
            <div className="service-box">
                <span className="service window-treatments">Window treatments</span>
    </div>*/}
        </div>
        </div>
        </div>
    )
}

export default Services;
