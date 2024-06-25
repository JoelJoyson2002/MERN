import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../MetaData';

import './UpdateEmployee.css'

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
import {  getEmployee, updateEmployee } from '../../actions/employeeAction';
import { clearEmployeeUpdated } from '../../slices/employeeSlice';
import { clearAuthError } from '../../actions/userAction';
import { clearError } from '../../slices/authSlice';
//import { getEmployee } from '../../../../Backend/config/controllers/employeecontroller';


export default  function  UpdateEmployee(){
    

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
      const[imagesCleared,setImagesCleared]=useState(false);
      const[imagePreview,setImagePreview]=useState([]);
     // const[seeWorking,setSeeworking]=useState("");
      const{id:employeeId}=useParams();
      const{loading,isEmployeeUpdated,error,employeeById}=useSelector(state=>state.employeeState);
      console.log("empstate",employeeById)
    const service=[
          "plumber",
          "electrician",
          "softwarehandler",
          "cleaner",
          "pestcontroller"
    ];

    const dispatch=useDispatch();

    const workingHour=[

      "01 to 09",
      "09 to 17",
      "17 to 23"
  ]


    

    

const onImageChange=(e)=>{
      const files=Array.from(e.target.files);
      
      files.forEach(file=>{
            const reader=new FileReader();
           

            reader.onload=()=>{
                if(reader.readyState==2){


                    console.log("file,",file.name)
                    setImagePreview((oldArray) => [ reader.result]);
                    
                    setImages([file])
                    console.log("new ",images)
                    
                }
            }
            reader.readAsDataURL(file)
      })


}
const downloadFile = async () => {
    try {
      // Assuming the file is the first element in the images array
      const file = images[0];
      
  
      // Create a blob from the file
      const blob = new Blob([file], { type: file.type });
      
  
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
  
      // Set the filename (you can customize this)
      link.download = 'downloaded_file.jpeg';
  
      // Simulate a click on the anchor to trigger the download
      link.click();
  
      // Clean up by removing the temporary anchor
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading file', error);
    }
    
  };

 
  

const submithandler=(e)=>{
    e.preventDefault();
    console.log("image in form",images)
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
    formData.append('imagesCleared',imagesCleared);
    //formData.append('seeWorking',seeWorking);
    images.forEach(Filename=>{
        formData.append('images',Filename)
    })
    

    dispatch(updateEmployee(employeeId,formData))
    
    


}

const clearImagesHandler=()=>{
    setImages([]);
    setImagePreview([])
    setImagesCleared(true);
}



useEffect(()=>{
   if(isEmployeeUpdated){
    
      toast(`successfully updated`,{
        type:'success',
        position:toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(clearEmployeeUpdated())
        
      })
      console.log("lio",images)
      
      
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

   dispatch(getEmployee(employeeId))

},[isEmployeeUpdated,error,dispatch])

useEffect(()=>{
  if(employeeById){
    console.log("employeebY id",employeeById)
     setName(employeeById.name);
     setAge(employeeById.age);
     setExperience(employeeById.experience);
     setContact(employeeById.contact);
     setEmail(employeeById.email);
     setLocation(employeeById.location);
     setServiceCharge(employeeById.serviceCharge);
     setPassword(employeeById.password);
     setService_type(employeeById.service_type);
     setWorking(employeeById.working);
     //setSeeworking(employeeById.seeWorking);
     console.log("final",employeeById.images);
    
     let images=[];
     
     employeeById.images.forEach(image=>{
            //images.push(image.Filename);
            const baseUrl = 'http://127.0.0.1:3000';
            
            // Use the URL object to create an absolute URL
            let absoluteUrl = new URL(image.Filename, baseUrl);

            // Check if the pathname includes '/images'
            if (!absoluteUrl.pathname.includes('/images')) {
                // Add '/images' at the beginning of the pathname
                absoluteUrl.pathname = '/images' + absoluteUrl.pathname;
            }

            // Remove '/public' from the pathname
            const relativePath = absoluteUrl.pathname.replace('/public', '');
            console.log("relative path",relativePath);

            images.push(relativePath);
     });

     setImagePreview(images)
     console.log("image preview",imagePreview)
     
     //setImages(images);

    const fetchImageFiles = async () => {
        
        const imageFiles = await Promise.all(images.map(async (imageUrl) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          return new File([blob], images, { type: blob.type });
        }));
        
        
        
        //setImages(imageFiles);
       
        setImages(imageFiles);
        console.log("hell",images)
      };
  
      fetchImageFiles();

      
     

        

  }


},[employeeById])
console.log("6-images1",images)

let firstkey="";

if(working!=undefined){

const keys = Object.keys(working); // Get all keys of the object
firstkey=keys[0]
console.log("first key",firstkey);

}




    return(
                 
        <div className="Asparagus" style={{ height: '140vh' }}>
        <div className="Broccoli">
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



    <form  onSubmit={submithandler} className='Brussels'>
       <h1>Update home service provider</h1> <br/><br/>

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
         <label>Enter Service Charge</label>
         <input type="number"  name="service_charge"  required
          onChange={e=>setServiceCharge(e.target.value)}
          value={serviceCharge}
          
         />
         <br/><br/>

         <label>Password</label>
         <input type="password"  name="review"  required
          onChange={e=>setPassword(e.target.value)}
          value={password}
          
         />
         <br/><br/>

         <label>Select Service type</label>
         <select value={service_type} onChange={e=>setService_type(e.target.value)} className='Celeriac' required>
                 <option value="">Select</option>
                 {service.map(ser=>(
                    
                    <option key={ser} value={ser}>
                        {ser}
                    </option>
                 ))}

         </select>
         <br/><br/>
         <label>Enter Working Shift</label> 
        

         <select value={working} onChange={e=>setWorking(e.target.value)} className='Celeriac' required>
                 <option value="">Select</option>
                 {workingHour.map(ser=>(
                    
                    <option key={ser} value={ser}>
                        {ser}
                    </option>
                 ))}

         </select>
         <br/><br/>


         {firstkey === "0" || "" ? null  : `Previously Selected starting working time=>${firstkey}:00`}<br/><br/>

         

         <label>Select Image</label>
         <input type="file"  multiple name="Filename"   required
         onChange={onImageChange}

          
         />
        {/*<img src="/images/test.jpeg" alt="no" />*/}
         
         

        {imagePreview.map(image=>(
            <img className='mt-3 mr-2'
            key={image}
            src={image}
           //src="/images/dog.jpeg"
            
            alt={"Image Preview"}
            
            width="55"
            height="52"
            />
       ))} 
         
         
         <br/><br/>
       {/*}  {imagePreview.length>0 && <button className="Chilli" onClick={clearImagesHandler} >Clear Image</button> }*/}


         <br></br><br></br>


         <button type="button" className="Pepper" onClick={downloadFile}>
  Download File
</button>

         
         
         
         
         <button type="submit" disabled={loading} className="Capsicum">Update</button><br></br><br/>
        
       </form>


</div></div></div>
    )
}