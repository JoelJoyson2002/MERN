import { useSelector } from 'react-redux';
import MetaData from '../MetaData';
import './userprofile.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CustomDropdown from './customdropdown';
import { Navigate } from 'react-router-dom';

const UserProfile = () => {
  const{isAuthenticated}=useSelector(state=>state.authState);

    const{user}=useSelector(state=>state.authState);
     useEffect(()=>{
           
     },[user])

     if(!user){
        return;
     }

   const formattedDate = String(user.createdAt).substring(0, 10);
   const reversedDate = formattedDate.split('-').reverse().join('-');
   
    return (
        <div className="Gill" style={{ height: '140vh' }}>
        <div className="Rohit">
            <MetaData title={'profile'}/>
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
        
        <Navigate to="/login"/>

}
     </ul>

</div>
</div>
<div className="profile-container">
      <div className="profile-image-container">
        <img src={`/images/profilepic.png`} alt="not found" /><br/>
        <Link to={'/userprofile/update'}><button className="see-bookings">Edit Profile</button></Link>
      </div>
      
      

      <div className="informations">
      

       
        
        <div className="detailed">Details</div><br />
        <div className="aligned">

        <span className="namings"><span style={{color:'blue'}}>Name:</span>{user.name}</span><br />
        <span className="emaild"><span style={{color:'blue'}}>Email: </span> {user.email}</span><br />
        <span className="joined"><span style={{color:'blue'}}>Joined At: </span> </span><br />
        
        {reversedDate}
        
       
       <div className="sep">
        
     <Link to="/orders"><button className="see-booking">Bookings</button><br/><br/></Link>
        <Link to="/changepassword"><button className="see-bookings" >ChangePassword</button></Link>
        </div>
        

        </div>
      </div>
    </div>
    </div>
    </div>
</div>

)
}

export default UserProfile;