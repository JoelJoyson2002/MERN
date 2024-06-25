import { createSlice } from "@reduxjs/toolkit";


const getuserSlice=createSlice({
    name:'getuser',
    initialState:{
        loading:true,
        getuserbyemp:{},
        userData:null
    },
    reducers:{
       getuserbyempRequest(state,action){
            
             return{
                loading:true,
                
             }
       },
       getuserbyempSuccess(state,action){
            return{
                loading:false,
                
               userData:action.payload.userData
                
            }
       },
       getuserbyempFail(state,action){
          return{
            loading:false,
            
            error:action.payload
          }
    },
    clearError(state,action){
        return{
            error:null,
            
            
        }
    },

}

})

const {actions,reducer}=getuserSlice;

export const{getuserbyempRequest,getuserbyempSuccess,getuserbyempFail}=actions

export default reducer;