
import EmployeeList from './EmployeeList'
import './Sidebar.css'
import { Link } from 'react-router-dom'


export default function Sidebar(){


    return(
        <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul >
                    <li>
                        <div className='Bottle'>
                        <Link to="/admin/dashboard">DashBoard</Link>
                         </div>
                                     
                    </li>
                    <li>
                        <div className='Snake'>
                        <Link to="/admin/users">-users</Link>  
                         </div>
                           
                                     
                    </li>
                     
                         <div className="SweetPotato">
                        employees
                        </div>
                        <li><div className='ElephantFoot'>
                           <Link to="/admin/employees"> - All</Link>
                           </div></li>

                           <li><div className='Cabbage'>
                           <Link to="/admin/employees/create"> - + Create</Link> 
                           </div></li>
                           
                        <li> 
                            
                         <div className="Corn">
                        <Link to="/admin/orders">- Bookings</Link>
                        </div></li>

                        <li> 
                         <div className="Raddish">
                         <Link to="/admin/allfeedbacks">- Reviews</Link> 
                        </div></li>

                        <li> 
                            
                         <div className="Blueberry">
                        <Link to="/admin/employeeresponse">- Employee Response</Link>
                        </div></li>
                    
                    
         
            
                    
                </ul>
                </nav>
            </div>
            
            
    )
}