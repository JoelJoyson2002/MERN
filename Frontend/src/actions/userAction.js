import axios from 'axios';
import { 
    loginRequest,
    loginFail,
    loginSuccess,
     clearError,
    registerFail,
registerSuccess,
registerRequest,
loadUserRequest,
loadUserSuccess,
loadUserFail,
logoutSuccess,
logoutFail,
updateprofileRequest,
updateProfileSuccess,
updateProfileFail,
updateProfileChange,
updatePasswordRequest,
updatePasswordSuccess,
updatePasswordFail,
forgotPasswordRequest,
forgotPasswordSuccess,
forgotPasswordFail,
resetPasswordRequest,
resetPasswordSuccess,
resetPasswordFail,
SendNotification,
SendNotificationFail
 } 
 from '../slices/authSlice';
import Login from '../pages/login';
import { deleteuserFail, deleteuserRequest, deleteuserSuccess, updateuserFail, updateuserRequest, updateuserSuccess, userFail, userRequest, userSuccess, usersFail, usersRequest, usersSuccess } from '../slices/userSlice';

export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch(loginRequest())
        const{data}=await axios.post('/api/v1/login',{email,password});
        dispatch(loginSuccess(data))
    }
    catch(error){
        dispatch(loginFail(error.response.data.message))
    }
}

export const clearAuthError=dispatch=>{
    console.log("hello")
    dispatch(clearError())
}



export const register=(userData)=>async(dispatch)=>{
    try{
        dispatch(registerRequest())
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        const{data}=await axios.post('/api/v1/register',userData);
        dispatch(registerSuccess(data))
    }
    catch(error){
        dispatch(registerFail(error.response.data.message))
    }
}

export const updateProfile=(userData)=>async(dispatch)=>{
    try{
        dispatch(updateprofileRequest())
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        const{data}=await axios.put('/api/v1/updateprofile',userData);
        dispatch(updateProfileSuccess(data))
    }
    catch(error){
        console.log("what to do",error)
        

        dispatch(updateProfileFail(error.response.data.message));
    }
}


export const updateProfileChanges=dispatch=>{
    dispatch(updateProfileChange())
}


export const updatePassword=(userData)=>async(dispatch)=>{
    try{
        dispatch(updatePasswordRequest())
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
       const{data}=await axios.put('/api/v1/changepassword',userData);
       console.log("dddta",data)
        dispatch(updatePasswordSuccess(data))
    }
    catch(error){
        console.log("what is ",error)
        
        
        dispatch(updatePasswordFail(error.response.data.message))
    }
}


export const loadUser=async(dispatch)=>{
    try{
        dispatch(loadUserRequest())
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        const{data}=await axios.get('/api/v1/userprofile');
        dispatch(loadUserSuccess(data))
    }
    catch(error){
        dispatch(loadUserFail(error.response.data.message))
    }
}



export const logout=async(dispatch)=>{
    try{
       
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        await axios.get('/api/v1/logout');
        dispatch(logoutSuccess())
    }
    catch(error){
        dispatch(logoutFail(error.response.data.message))
    }
}

export const forgotPassword=(userData)=>async(dispatch)=>{
    try{
        dispatch(forgotPasswordRequest())
        const{data}=await axios.post('/api/v1/password/forgot',userData);
        dispatch(forgotPasswordSuccess(data))
    }
    catch(error){
        dispatch(forgotPasswordFail(error.response.data.message))
    }
}

export const SendNot=(email,approval,id)=>async(dispatch)=>{
    try{
        
        const{data}=await axios.post(`/api/v1/admin/sendNotification?email=${email}&approval=${approval}&id=${id}`);
        console.log("datesan",data)
        dispatch(SendNotification(data));
    }
    catch(error){
         dispatch(SendNotificationFail(error.response.data.message))
}
}


export const resetPassword=(userData,token)=>async(dispatch)=>{
    try{
        console.log("goku")
        dispatch(resetPasswordRequest())
        const{data}=await axios.post(`/api/v1/password/reset/${token}`,userData);
        dispatch(resetPasswordSuccess(data))
    }
    catch(error){
        dispatch(resetPasswordFail(error.response.data.message))
    }
}



export const getUsers=async(dispatch)=>{
    try{
        dispatch(usersRequest())
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        const{data}=await axios.get('/api/v1/admin/users');
        dispatch(usersSuccess(data))
    }
    catch(error){
        dispatch(usersFail(error.response.data.message))
    }
}


export const getUser=id=>async(dispatch)=>{
    try{
        dispatch(userRequest())
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        const{data}=await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))
    }
    catch(error){
        dispatch(userFail(error.response.data.message))
    }
}


export const deleteUser=id=>async(dispatch)=>{
    try{
        dispatch(deleteuserRequest())
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteuserSuccess())
    }
    catch(error){
        dispatch(deleteuserFail(error.response.data.message))
    }
}



export const updateUser=(id,userData)=>async(dispatch)=>{
    try{
        dispatch(updateuserRequest())
        console.log("userData",userData);
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
       await axios.put(`/api/v1/admin/user/${id}`,userData);
      
        dispatch(updateuserSuccess())
    }
    catch(error){
       
        
        
        dispatch(updateuserFail(error.response.data.message))
    }
}

