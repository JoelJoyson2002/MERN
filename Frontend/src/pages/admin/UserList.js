import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getAdminEmployees } from "../../actions/employeesActions";

import CustomDropdown from '.././customdropdown';
import './UserList.css';

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
import { deleteUser, getUsers  } from '../../actions/userAction';
import { deleteEmployee } from "../../actions/employeeAction";
import { clearEmployeeDeleted } from "../../slices/employeeSlice";
import { clearError } from "../../slices/userSlice";
import { clearuserDeleted } from "../../slices/userSlice";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";

export default function UserList(){
    const{isAuthenticated}=useSelector(state=>state.authState)
    console.log("isAuth",isAuthenticated)
    const navigate=useNavigate();
    const{users=[],loading=true,error,isUserDeleted}=useSelector(state=>state.userState);
    //const{isEmployeeDeleted,error:EmployeeError}=useSelector(state=>state.employeeState)
    
    const dispatch=useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    
    

    const deleteHandler=(e,id)=>{
        //e.target.disabled=true;
        dispatch(deleteUser(id))
    }

    const handleSearch = () => {
      const filtered = users.filter(user => user._id.includes(searchQuery));
      setFilteredUsers(filtered);
  }

    


    useEffect(()=>{
      

        if(error){
            toast(error,{
               position:toast.POSITION.BOTTOM_CENTER,
               type:'error',
               onOpen:()=>{dispatch(clearError())}
            })
            return;
        }
        if(isUserDeleted){
            toast("User Deleted Successfully ",{
              type:'success',
              position:toast.POSITION.BOTTOM_CENTER,
              onOpen:()=>dispatch(clearuserDeleted())
            })
            
            return;
         }

        dispatch(getUsers)
        console.log("users now",users)
        setFilteredUsers(users);


         },[dispatch,error,isUserDeleted])

         
         useEffect(() => {
          setFilteredUsers(users);
      }, [users]);



    return(
            
                    
        <div className="Delicate" style={{ height: '140vh' }}>
        <div className="Eddoe">
            <MetaData title={'admin/bookings'}/>
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


               <div className="ap">
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


<div className='Fiddlehead'>
           <table className="Fennel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
        {filteredUsers.map((item) => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td><Link to={`/admin/user/${item._id}`}>Edit User</Link></td>
            {/* Add more cells based on your data structure */}
            <td><button onClick={e=>deleteHandler(e,item._id)}>Delete User</button></td>
            
            {/*<td><button onClick={e=>deleteHandler(e,item._id)}>Delete Employee</button></td>*/}
          </tr>
        ))}
      </tbody>

           </table>
           </div>
        
        
        </div>
        </div></div>
             
        
    )
}