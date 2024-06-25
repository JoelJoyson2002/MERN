import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:'user',
    initialState:{
        loading:false,
        user:{},
        users:[],
        isUserUpdated:false,
        isUserDeleted:false
    },
    reducers:{
       usersRequest(state,action){
            
             return{
              ...state,
                loading:true
             }
       },
       usersSuccess(state,action){
            return{
              ...state,
                loading:false,
                users:action.payload.users
                
            }
       },
       usersFail(state,action){
          return{
            ...state,
            loading:false,
            error:action.payload
          }
    },
    userRequest(state,action){
            
      return{
       ...state,
         loading:true
      }
},
userSuccess(state,action){
     return{
       ...state,
         loading:false,
         user:action.payload.user
         
     }
},
userFail(state,action){
   return{
     ...state,
     loading:false,
     error:action.payload
   }
},


deleteuserRequest(state,action){
            
  return{
   ...state,
     loading:true
  }
},
deleteuserSuccess(state,action){
 return{
   ...state,
     loading:false,
     isUserDeleted:true
     
 }
},
deleteuserFail(state,action){
return{
 ...state,
 loading:false,
 error:action.payload
}
},


updateuserRequest(state,action){
            
  return{
   ...state,
     loading:true
  }
},
updateuserSuccess(state,action){
 return{
   ...state,
     loading:false,
     isUserUpdated:true
     
 }
},
updateuserFail(state,action){
return{
 ...state,
 loading:false,
 error:action.payload
}
},

clearuserDeleted(state,action){
  return{
   ...state,
   isUserDeleted:false
  }
  },

  
clearuserUpdated(state,action){
  return{
   ...state,
   isUserUpdated:false
  }
  },

  clearError(state,action){
    return{
            ...state,
            error:null
    }
  }



   

}});

const {actions,reducer}=userSlice;

export const{
  usersRequest,
  usersSuccess,
  usersFail,
  userRequest,
  userSuccess,
  userFail,
  deleteuserRequest,
  deleteuserSuccess,
  deleteuserFail,
  updateuserRequest,
  updateuserSuccess,
  updateuserFail,
  clearuserDeleted,
  clearuserUpdated,
  clearError
}=actions

export default reducer;