import axios from 'axios';
import { getuserbyempFail, getuserbyempRequest, getuserbyempSuccess } from '../slices/getuserbyemployeeSlice';

export const getuserbyemp=id=>async(dispatch)=>{
    try{
           dispatch(getuserbyempRequest());
           const {data}=await axios.get(`/api/v1/getUser/${id}`);
           console.log("daat",data)
           dispatch(getuserbyempSuccess(data));

    }

    catch(error){
           
        dispatch(getuserbyempFail(error.response.data.message));
    }
 }