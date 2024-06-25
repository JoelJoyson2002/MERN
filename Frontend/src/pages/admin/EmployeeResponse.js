

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getAdminEmployees } from "../../actions/employeesActions";

import CustomDropdown from '.././customdropdown';
import './EmployeeResponse.css';

import Sidebar from "./Sidebar";

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
import { deleteOrders, orderDetail as orderDetailAction } from '../../actions/orderActions';
import { deleteEmployee } from "../../actions/employeeAction";
import { clearEmployeeDeleted } from "../../slices/employeeSlice";
import { clearError } from "../../slices/authSlice";
import { clearOrderDeleted } from "../../slices/orderSlice";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { getempresponse } from "../../actions/empresponseAction";

export default function EmployeeResponse(){
    const{isAuthenticated}=useSelector(state=>state.authState)
    console.log("isauth",isAuthenticated)
    const navigate=useNavigate();
   const{getempres}=useSelector(state=>state.empresponseState)
    //const{isEmployeeDeleted,error:EmployeeError}=useSelector(state=>state.employeeState)
    
    
    const dispatch=useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooking, setFilteredBooking] = useState(getempres);

   /* const deleteHandler=(e,id)=>{
        
        dispatch(deleteOrders(id))
    }*/

    const handleSearch = () => {
      const filtered = getempres.filter(booking => booking.bookingid.includes(searchQuery));
      setFilteredBooking(filtered);
  }


   


      useEffect(()=>{
        dispatch(getempresponse)
        setFilteredBooking(getempres)

      },[dispatch])
 
      useEffect(() => {
        setFilteredBooking(getempres);
    }, [getempres]);
      if(!isAuthenticated){
     
        return (
          <div className="loading">
            Loading...<br />
            <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br></br>
            <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
            
          </div>
        );
      
    }

      
if(!filteredBooking) return;



    return(
            
                    
        <div className="Blackberry" style={{ height: '140vh' }}>
        <div className="Muskmelon">
            <MetaData title={'admin/empresponse'}/>
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


               <div className="Durian">
                            <input
                                type="text"
                                placeholder="Search by ID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button onClick={handleSearch}>Search</button>
                        </div><br></br><br></br>




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


<div className='Pomegranate'>
           <table className="Grapes">
            <thead>
                <tr>
                    <th>Booking Id</th>
                    <th>Employee Availability</th>
                    
                </tr>
                </thead>
                <tbody>
        {filteredBooking.map((item) => (
          <tr key={item.id}>
            <td>{item.bookingid}</td>
            <td>{item.Availability}</td>
           
           
            
           
          </tr>
        ))}
      </tbody>

           </table>
           </div>
        
        
        </div>
        </div></div>
             
        
    )
}