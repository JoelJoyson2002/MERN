import axios from 'axios';
import { GetFeedbackFail, GetFeedbackRequest, GetFeedbackSuccess, ReceiveFeedbackFail, ReceiveFeedbackRequest, ReceiveFeedbackSuccess, clearError, empresponseFail, empresponseRequest, empresponsetSuccess, getEmployeeResponseFail, getEmployeeResponseRequest, getEmployeeResponseSuccess, sendFeedbackFail, sendFeedbackRequest, sendFeedbackSuccess } from '../slices/employeeResponseSlice';

export const empresponse=(bookingid,Availability)=>async(dispatch)=>{
    try{
        dispatch(empresponseRequest())
        const{data}=await axios.post('/api/v1/empresponse',{bookingid,Availability});
        dispatch(empresponsetSuccess(data))
    }
    catch(error){
        dispatch(empresponseFail(error.response.data.message))
    }
}

export const clearAuthError=dispatch=>{
    console.log("hello")
    dispatch(clearError())
}

export const getempresponse=async(dispatch)=>{
    try{
        dispatch(getEmployeeResponseRequest())
        const{data}=await axios.get('/api/v1/admin/getempresponse');
        dispatch(getEmployeeResponseSuccess(data))
    }
    catch(error){
        dispatch(getEmployeeResponseFail(error.response.data.message))
    }
}


export const SendFeedback=(email,bookid)=>async(dispatch)=>{
    try{
        dispatch(sendFeedbackRequest())
        console.log("email",email)
        const{data}=await axios.get(`/api/v1/sendemailfeedback?email=${email}&bookid=${bookid}`)
        console.log("viki",data)
        dispatch(sendFeedbackSuccess(data));
    }


    catch(error){
        dispatch(sendFeedbackFail(error.response.data.message))
    }

}


export const CreateFeedback=(feedback,rating,bookid)=>async(dispatch)=>{
    try{
        dispatch(ReceiveFeedbackRequest())
        
        const{data}=await axios.post(`/api/v1/receivefeedback?rating=${rating}&bookid=${bookid}&feedback=${feedback}`)
        console.log("viki",data)
        dispatch(ReceiveFeedbackSuccess(data));
    }


    catch(error){
        dispatch(ReceiveFeedbackFail(error.response.data.message))
    }

}

export const GetFeedback=async(dispatch)=>{
    try{
        dispatch(GetFeedbackRequest())
        
        const{data}=await axios.get(`/api/v1/admin/getfeedbacks`)
        console.log("viki",data)
        dispatch(GetFeedbackSuccess(data));
    }


    catch(error){
        dispatch(GetFeedbackFail(error.response.data.message))
    }

}


