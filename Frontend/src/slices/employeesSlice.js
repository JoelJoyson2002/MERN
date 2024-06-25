import { createSlice } from "@reduxjs/toolkit";


const employessSlice=createSlice({
    name:'employees',
    initialState:{
        loading:false,
        extractemployee_details:[]
    },
    reducers:{
       employeesRequest(state,action){
            
             return{
                loading:true
             }
       },
       employeesSuccess(state,action){
            return{
                loading:false,
                employee_details:action.payload.employee_details
                
            }
       },
       employeesFail(state,action){
          return{
            loading:false,
            error:action.payload
          }
    },

    employeesextractRequest(state,action){
            
      return{
         loading:true
      }
},
employeesextractSuccess(state,action){
     return{
         loading:false,
         extractemployee_details:action.payload
         
     }
},
employeesextractFail(state,action){
   return{
     loading:false,
     error:action.payload
   }
},


    adminemployeesRequest(state,action){
            
        return{
           loading:true
        }
  },
  adminemployeesSuccess(state,action){
       return{
           loading:false,
           employee_details:action.payload.employees
           
       }
  },
  adminemployeesFail(state,action){
     return{
       loading:false,
       error:action.payload
     }
}


}});

const {actions,reducer}=employessSlice;

export const{employeesRequest,employeesFail,employeesSuccess,adminemployeesRequest,adminemployeesSuccess,adminemployeesFail,employeesextractRequest,employeesextractSuccess,employeesextractFail}=actions

export default reducer;