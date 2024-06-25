 //creation employeesActions

 import axios from 'axios';
import { adminemployeesFail, adminemployeesRequest, adminemployeesSuccess, employeesFail, employeesRequest, employeesSuccess, employeesextractFail, employeesextractRequest, employeesextractSuccess } from '../slices/employeesSlice';
 export const getEmployees=async(dispatch)=>{
    try{
           dispatch(employeesRequest());
           const {data}=await axios.get('/api/v1/emp');
           //console.log(data)
           dispatch(employeesSuccess(data));

    }

    catch(error){
           
        dispatch(employeesFail(error.response.data.message));
    }
 }


 export const extractEmployees=(location,service_type,time)=>async(dispatch)=>{
    try{
           dispatch(employeesextractRequest());

           const {data}=await axios.get(`/api/v1/extractemp?location=${location}&service_type=${service_type}&time=${time}`);
           console.log("data",data)
           dispatch(employeesextractSuccess(data));

    }

    catch(error){
           
        dispatch(employeesextractFail(error.response.data.message));
    }
 }



 export const getAdminEmployees=async(dispatch)=>{
    try{
           dispatch(adminemployeesRequest());
           const {data}=await axios.get('/api/v1/admin/emps');
           console.log("data",data)
           dispatch(adminemployeesSuccess(data));
           console.log("emp dtails")

    }

    catch(error){
           
        dispatch(adminemployeesFail(error.response.data.message));
    }
 }
