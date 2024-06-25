import axios from 'axios';
import { clearLoginError, employeeLoginFail, employeeLoginRequest, employeeLoginSuccess, employeeLogoutFail, employeeLogoutSuccess } from '../slices/authEmployee';



export const Employeelogin=(email,password)=>async(dispatch)=>{
    try{
        dispatch(employeeLoginRequest())
        console.log(email,password)
        const{data}=await axios.post('/api/v1/login/employee',{email,password});
        console.log("data",data);
        dispatch(employeeLoginSuccess(data))
    }
    catch(error){
        dispatch(employeeLoginFail(error.response.data.message))
    }
}

export const clearEmployeeAuthError=dispatch=>{
    console.log("hello")
    dispatch(clearLoginError())
}



export const logoutEmployee=async(dispatch)=>{
    try{
       
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        //localStorage.removeItem('authEmployeeState');
        await axios.get('/api/v1/logout/employee');
        dispatch(employeeLogoutSuccess())
    }
    catch(error){
        dispatch(employeeLogoutFail(error.response.data.message))
    }
}
