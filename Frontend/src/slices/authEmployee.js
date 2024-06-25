import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'authEmployee',
    initialState:{
        loading:true,
        isAuthenticatedEmployee:false,
        employee:null
    },
    reducers:{
       employeeLoginRequest(state,action){
            
             return{
                loading:true,
                isAuthenticatedEmployee:false
             }
       },
       employeeLoginSuccess(state,action){
            return{
                ...state,
                loading:false,
                isAuthenticatedEmployee:true,
                employee:action.payload.employee
                
            }
       },
       employeeLoginFail(state,action){
          return{
            loading:false,
            isAuthenticatedEmployee:false,
            error:action.payload
          }
    },
    clearLoginError(state,action){
        return{
            error:null,
            
            
        }
    },
   
     employeeLogoutSuccess(state,action){
        return{
            loading:false,
            isAuthenticatedEmployee:false,
            
        }
     },
     employeeLogoutFail(state,action){
        return{
            ...state,
            
            error:action.payload
        }
     },
    

}});

const {actions,reducer}=authSlice;

export const{
   employeeLoginRequest,
   employeeLoginFail,
   employeeLoginSuccess,
   employeeLogoutSuccess,
   employeeLogoutFail,
   clearLoginError,


}=actions

export default reducer;