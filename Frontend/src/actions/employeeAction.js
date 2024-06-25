 //creation employeesActions

 import axios from 'axios';
import { createReviewFail, createReviewRequest, createReviewSuccess, deleteEmployeeFail, deleteEmployeeRequest, deleteEmployeeSuccess, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, employeeFail, employeeRequest, employeeSuccess, newEmployeeFail, newEmployeeRequest, newEmployeeSuccess, reviewsFail, reviewsRequest, reviewsSuccess, updateEmployeeFail, updateEmployeeRequest, updateEmployeeSuccess } from '../slices/employeeSlice';
 export const getEmployee=id=>async(dispatch)=>{
    try{
           dispatch(employeeRequest());
           const {data}=await axios.get(`/api/v1/emp/empid/${id}`);
           //console.log(data)
           dispatch(employeeSuccess(data));

    }

    catch(error){
           
        dispatch(employeeFail(error.response.data.message));
    }
 }


 
 export const createNewEmployee=employeeData=>async(dispatch)=>{
    try{
           dispatch(newEmployeeRequest());
           const {data}=await axios.post('/api/v1/admin/emp/new',employeeData);
           console.log("data",data)
           dispatch(newEmployeeSuccess(data));
           console.log("emp dtails")

    }

    catch(error){
           
        dispatch(newEmployeeFail(error.response.data.message));
    }
 }

 
 export const deleteEmployee=id=>async(dispatch)=>{
    try{
           dispatch(deleteEmployeeRequest());
           await axios.delete(`/api/v1/admin/emp/${id}`);
           
           dispatch(deleteEmployeeSuccess());
           

    }

    catch(error){
           
        dispatch(deleteEmployeeFail(error.response.data.message));
    }
 }



 export const updateEmployee=(id,employeeData)=>async(dispatch)=>{

    try{
        console.log("Hulk",employeeData)
           dispatch(updateEmployeeRequest());
           const {data}=await axios.put(`/api/v1/admin/emp/${id}`,employeeData);
           console.log("data",data)
           dispatch(updateEmployeeSuccess(data));
           console.log("emp dtails")

    }

    catch(error){
           
        dispatch(updateEmployeeFail(error.response.data.message));
    }
 }

 export const createReview=reviewData=>async(dispatch)=>{
    try{
           dispatch(createReviewRequest());
           const {data}=await axios.put(`/api/v1/review`,reviewData);
           //console.log(data)
           dispatch(createReviewSuccess(data));

    }

    catch(error){
           
        dispatch(createReviewFail(error.response.data.message));
    }
 }



 export const getReviews=id=>async(dispatch)=>{
    try{
           dispatch(reviewsRequest());
           const {data}=await axios.get(`/api/v1/getReview/${id}`);
           //console.log(data)
           dispatch(reviewsSuccess(data));

    }

    catch(error){
           
        dispatch(reviewsFail(error.response.data.message));
    }
 }

 
 export const deleteReview=(empid,id)=>async(dispatch)=>{
    try{
           dispatch(deleteReviewRequest());
           await axios.delete(`/api/v1/deleteReview/${empid}/${id}`);
           //console.log(data)
           dispatch(deleteReviewSuccess());

    }

    catch(error){
           
        dispatch(deleteReviewFail(error.response.data.message));
    }
 }
