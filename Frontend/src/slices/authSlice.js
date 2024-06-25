import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'auth',
    initialState:{
        loading:true,
        isAuthenticated:false,
        notification:false
    },
    reducers:{
       loginRequest(state,action){
            
             return{
                loading:true,
                isAuthenticated:false
             }
       },
       loginSuccess(state,action){
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
                
            }
       },
       loginFail(state,action){
          return{
            loading:false,
            isAuthenticated:false,
            error:action.payload
          }
    },
    clearError(state,action){
        return{
            error:null,
            
            
        }
    },
    registerRequest(state,action){
            
        return{
           loading:true,
           isAuthenticated:false
        }
  },
  registerSuccess(state,action){
       return{
           loading:false,
           isAuthenticated:true,
           user:action.payload.user
           
       }
  },
  registerFail(state,action){
     return{
       loading:false,
       isAuthenticated:false,
       error:action.payload
     }
},
     loadUserRequest(state,action){
        return{
            ...state,
            isAuthenticated:false,
            loading:true
        }
     },
     loadUserSuccess(state,action){
        return{
            loading:false,
            isAuthenticated:true,
            user:action.payload.user
        }
     },
     loadUserFail(state,action){
        return{
            ...state,
            loading:false,
            /*error:action.payload*/
        }
     },
     logoutSuccess(state,action){
        return{
            loading:false,
            isAuthenticated:false,
            
        }
     },
     logoutFail(state,action){
        return{
            ...state,
            
            error:action.payload
        }
     },
     updateprofileRequest(state,action){
            
        return{
           loading:true,
           isAuthenticated:false,
           isUpdated:false
        }
  },
  updateProfileSuccess(state,action){
       return{
           loading:false,
           isAuthenticated:true,
           user:action.payload.user,
           isUpdated:true
           
       }
  },
  updateProfileFail(state,action){
     return{
        /*...state,*/
                isAuthenticated:true,
                loading: false,
                error:  action.payload,
                
                
     }
},
updateProfileChange(state,action){
    return{
        loading:false,
        isAuthenticated:true,
        isUpdated:false

    }
},
clearUpdateProfile(state,action){
    return{
       ...state,
        isUpdated:false       
               
               
    }
},

updatePasswordRequest(state,action){
            
    return{
       loading:true,
       isAuthenticated:true,
       isUpdated:false
    }
},
updatePasswordSuccess(state,action){
   return{
       loading:false,
       isAuthenticated:true,
       user:action.payload.user,
       isUpdated:true
       
   }
},
/*updatePasswordFail(state,action){
 return{
   loading:false,
   isAuthenticated:true,
   
   error:action.payload
 }
}*/
updatePasswordFail(state, action){
    return {
        ...state,
        loading: false,
        error:  action.payload,
        user:action.payload.user,
        isAuthenticated:true,
        isUpdated:false
    }
},
forgotPasswordRequest(state,action){
    return{
        ...state,
        loading:true,
        message:null
    }
},
forgotPasswordSuccess(state,action){
      return{
        ...state,
        loading:false,
        message:action.payload.message
      }
},
forgotPasswordFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
},
resetPasswordRequest(state,action){
    return{
        
        loading:true,
        isAuthenticated:false
    }
},
resetPasswordSuccess(state,action){
    return{
        ...state,
        loading:false,
        isAuthenticated:true,
        user:action.payload.user
    }
},
resetPasswordFail(state,action){
    return{
        ...state,
        loading:false,
        error:action.payload
    }
},


SendNotification(state,action){
    return{
         notification:true
    }
},
SendNotificationFail(state,action){
    return{
        error:action.payload
    }
}

}});



const {actions,reducer}=authSlice;

export const{
    loginRequest,
    loginFail,
    loginSuccess,
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    logoutFail,
    logoutSuccess,
    updateprofileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updateProfileChange,
    clearUpdateProfile,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    SendNotification,
    SendNotificationFail


}=actions

export default reducer;