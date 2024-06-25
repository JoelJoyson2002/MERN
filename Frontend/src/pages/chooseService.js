import { useSelector } from 'react-redux';
import MetaData from '../MetaData';
import './chooseService.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from './customdropdown';
import FadeLoader from "react-spinners/FadeLoader";
const ChooseService=()=>{
    const{isAuthenticated,user}=useSelector(state=>state.authState);
    const { location } = useParams();
    const navigate = useNavigate();
   // if(!user) return
    if(!isAuthenticated){
     
        return (
          <div className="loading">
            Loading...<br />
            <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
            <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
            
          </div>
        );
      
    }

    /*const handleServiceClick = (service) => {
        navigate(`/${location}${service}`);
      };*/
      const handleServiceClick = (service) => {
        navigate(`/${location}/${service}/time`);
      }
    return(
        <>
       
     <div className="I">
        <MetaData title={'chooseservice'}/>
    
                          
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
        
       <Navigate to="/login"/>

}
     </ul>
</div>

</div>

<div className="J">
    <h2>Choose the service you want</h2><br></br><br></br>
       <div className="Circles">
            <div className="circle-1" onClick={() => handleServiceClick('plumber')}>
            
                <span className="letters">Plumbing</span>
            </div>
            <div className="circle-2" onClick={() => handleServiceClick('electrician')}>
            
                <span className="letters">Electrical-appliances</span>
            </div>
            <div className="circle-3" onClick={() => handleServiceClick('softwarehandler')}>
            
                <span className="letters">Software-devices-service</span>
            </div>
            <div className="circle-4" onClick={() => handleServiceClick('cleaner')}>
            
                <span className="letters">Cleaning</span>
            </div>
            <div className="circle-5" onClick={() => handleServiceClick('pestcontroller')}>
            
                <span className="letters">Pest-Control</span>
            </div>
            {/*<div className="circle-6">
                <span className="letters">AC service</span>
            </div>
            <div className="circle-7">
                <span className="letters">Window Treatments</span>
    </div>*/}
          

       </div>
       </div>
          

</div>





    

        </>
        
    )
}

export default ChooseService;
