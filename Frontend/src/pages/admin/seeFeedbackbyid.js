

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


import CustomDropdown from '.././customdropdown';
import './seeFeedbackbyid.css';

import Sidebar from "./Sidebar";
import axios from 'axios';

//import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

//import './OrderDetail.css'
//import { getEmployee } from '../../actions/employeeAction';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

//import CustomDropdown from '.././customdropdown';
//import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { GetFeedback, getempresponse } from "../../actions/empresponseAction";

export default function FeedbackById(){
    const{isAuthenticated}=useSelector(state=>state.authState)
    const [feedbackData, setFeedbackData] = useState([]);
    console.log("isauth",isAuthenticated)
    const navigate=useNavigate();
    const{_id}=useParams();
   
    //const{isEmployeeDeleted,error:EmployeeError}=useSelector(state=>state.employeeState)
    
    
    const dispatch=useDispatch();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make API call to fetch feedback data
                const{data} = await axios.get(`/api/v1/admin/feedbackbyid?_id=${_id}`);

                // Assuming your backend returns feedback data as an array
                setFeedbackData(data);
            } catch (error) {
                // Handle error
                console.error('Error fetching feedback data:', error);
                // You can show a toast message or handle the error in a different way
                toast.error('Failed to fetch feedback data. Please try again later.');
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []); 


   


      if(!isAuthenticated){
     
        return (
          <div className="loading">
            Loading...<br />
            <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
            <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
            
          </div>
        );
      
    }

    

    if (!feedbackData || !feedbackData.feedbackById ) {
        return; // Return early if the properties are not defined or if feedback is undefined
      }
      
      




    return(
            
                    
        <div className="Hazelnut" style={{ height: '140vh' }}>
        <div className="Macadamias">
            <MetaData title={'admin/allFeedbacks'}/>
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


     
<div className='Garlic'>
                    <div className="Sidebar">
                        <Sidebar/>
                    </div>
                    <div >
                        
                        
                    </div>
               </div>






    {/* <div className='Onion'>
           <table className="Lettuce">
            <thead>
                <tr>
                    <th>employee Id</th>
                    <th>Name</th>
                    <th>Service_type</th>
                    <th>Location</th>
                    <th>Phone</th>
                    
                    <th>View</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
        {employee_details.map((item) => (
          <tr key={item.id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.service_type}</td>
            <td>{item.location}</td>
            <td>{item.contact}</td>
            
            <td><Link to={`/admin/employee/${item._id}`}>Update Employee</Link></td>
            
            <td><button onClick={e=>deleteHandler(e,item._id)}>Delete Employee</button></td>

          </tr>
        ))}
      </tbody>

           </table>
           </div>   */}
 <div className="Pecans">
              <p className="Pinenut">{feedbackData.feedbackById.feedback}</p>
            </div>
           





          
        
        
        </div>
        </div></div>
             
        
    )
}