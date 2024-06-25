import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './NewEmployee.css'

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import CustomDropdown from '../customdropdown';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getAdminEmployees } from '../../actions/employeesActions';
import { createNewEmployee } from '../../actions/employeeAction';
import { clearEmployeeCreated } from '../../slices/employeeSlice';
import { clearAuthError } from '../../actions/userAction';
import { clearError } from '../../slices/authSlice';

export default function NewEmployee(){
      const{isAuthenticated}=useSelector(state=>state.authState);
      const navigate=useNavigate();

      const[name,setName]=useState("");
      const[age,setAge]=useState("");
      const[experience,setExperience]=useState("");
      const[contact,setContact]=useState("");
      const[email,setEmail]=useState("");
      const[location,setLocation]=useState("");
      const[serviceCharge,setServiceCharge]=useState("");
      const[password,setPassword]=useState("");
      const[service_type,setService_type]=useState("");
      const[working,setWorking]=useState("")
      const[images,setImages]=useState([]);
      const[imagePreview,setImagePreview]=useState([]);
      //const[seeworking,setSeeworking]=useState("");

      const{loading,isEmployeeCreated,error}=useSelector(state=>state.employeeState);
    const service=[
          "plumber",
          "electrician",
          "softwarehandler",
          "cleaner",
          "pestcontroller"
    ];

    const workingHour=[

        "01 to 09",
        "09 to 17",
        "17 to 23"
    ]

    const dispatch=useDispatch();

    const calculateCharge=()=>{

        if(experience>15){
            setServiceCharge(16*50+500);
        }
        else
        setServiceCharge((experience-1)*50+500);
    }

const onImageChange=(e)=>{
      const files=Array.from(e.target.files);
      files.forEach(file=>{
             console.log("file",file);
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState==2){
                    setImagePreview(oldArray=>[reader.result])
                    
                    setImages(oldArray=>[file])
                    console.log("create page",images);
                }
            }
            reader.readAsDataURL(file)
      })


}

const submithandler=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',name);
    formData.append('age',age);
    formData.append('experience',experience);
    formData.append('contact',contact);
    formData.append('email',email);
    formData.append('location',location);
    formData.append('serviceCharge',serviceCharge);
    formData.append('password',password);
    formData.append('service_type',service_type);
    formData.append('working',working);
   // formData.append('seeWorking',seeworking);
    images.forEach(Filename=>{
        formData.append('images',Filename)
    })
    

    dispatch(createNewEmployee(formData))


}

useEffect(()=>{
   if(isEmployeeCreated){
      toast("Employee created Successfully ",{
        type:'success',
        position:toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(clearEmployeeCreated())
      })
      navigate("/admin/employees")
      return;
   }
   if(error){
    toast(error,{
        type:'error',
        position:toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(clearError())
      })
      return;
   }

},[isEmployeeCreated,error,dispatch])
console.log("Gif",imagePreview)
console.log("Gif1",images)


    return(
                 
        <div className="Corriander" style={{ height: '140vh' }}>
        <div className="Curryleaves">
            <MetaData title={'admin/create/employee'}/>
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
                    
<div className='Garlic'>
                    <div className="Sidebar">
                        <Sidebar/>
                    </div>
                    <div >
                        
                        
                    </div>
               </div>



    <form  onSubmit={submithandler} className='Mint'>
       <h1>Creating new home service provider</h1> <br/><br/>

       <label>Enter Name</label>
         <input type="text"  name="name"  required
         onChange={e=>setName(e.target.value)}
         value={name}
          
         />
         <br/><br/>

         <label>Enter Age</label>
         <input type="number"  name="age" required
         onChange={(e)=>{
            setAge(e.target.value)
         }}
         value={age}
          
         />
         <br/><br/>

         <label>Enter Experience</label>
         <input type="number"  name="experience"  required
           onChange={e=>setExperience(e.target.value)}
           value={experience}

         />
         <br/><br/>

         <label>Enter contact</label>
         <input type="number"  name="contact" required
          onChange={e=>setContact(e.target.value)}
          value={contact}
          
         />
         <br/><br/>

         <label>Enter Email</label>
         <input type="email"  name="email"  required

onChange={e=>setEmail(e.target.value)}
value={email}
          
         />
         <br/><br/>

         <label>Enter Location</label>
         <input type="text"  name="location"  required
          onChange={e=>setLocation(e.target.value)}
          value={location}
          
         />
         <br/><br/>
       { /* <label>Enter Service Charge</label>
         <input type="number"  name="service_charge"  required
          onChange={e=>setServiceCharge(e.target.value)}
          value={serviceCharge}
          
         />
        <br/><br/>*/}
        
        <input type="button" className='Walnut' name="service_charge" required onClick={calculateCharge} value="Calcuate Service Charge" />
        <input type="number"  value={serviceCharge} required
          onChange={e=>setServiceCharge(e.target.value)} >
           
          </input>
          
        <br/><br/>

         <label>Enter Password</label>
         <input type="password"  name="review"  required
          onChange={e=>setPassword(e.target.value)}
          value={password}
          
         />
         <br/><br/>

         <label>Select Service type</label>
         <select onChange={e=>setService_type(e.target.value)} className='Squash' required>
                 <option value="">Select</option>
                 {service.map(ser=>(
                    
                    <option key={ser} value={ser}>
                        {ser}
                    </option>
                 ))}

         </select>
         <br/><br/>
         <label>Enter Working Shift</label>
         <select onChange={e=>setWorking(e.target.value)} className='Squash' required>
                 <option value="">Select</option>
                 {workingHour.map(ser=>(
                    
                    <option key={ser} value={ser}>
                        {ser}
                    </option>
                 ))}

         </select>
         

         
          
         
         <br/><br/><br/>

         <label>Select Image</label>
         <input type="file"   name="Filename" required
         onChange={onImageChange}

          
         />

         {imagePreview.map(image=>(
            <img className='mt-3 mr-2'
            key={image}
            src={image}
            alt={"Image Preview"}
            width="55"
            height="52"
            />
         ))}
         
         
         <br/><br/>

         
         
         
         
         
         <button type="submit" disabled={loading} className="Pea">Create</button><br></br><br/>
        
       </form>


</div></div></div>
    )
}