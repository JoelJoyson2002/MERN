import { createSlice } from "@reduxjs/toolkit";


const employeeSlice=createSlice({
    name:'employee',
    initialState:{
        loading:false,
        isEmployeeCreated:false,
        isEmployeeDeleted:false,
        isEmployeeUpdated:false,
        isReviewSubmitted:false,
        isReviewDeleted:false,
        reviews:[]
    },
    reducers:{
       employeeRequest(state,action){
            
             return{
                ...state,
                loading:true
             }
       },
       employeeSuccess(state,action){
            return{
                ...state,
                loading:false,
                employeeById:action.payload.employeeById
                
            }
       },
       employeeFail(state,action){
          return{
            ...state,
            loading:false,
            error:action.payload
          }
    },

    newEmployeeRequest(state,action){
            
        return{
            ...state,
           loading:true
        }
  },
  newEmployeeSuccess(state,action){
       return{
        ...state,
           loading:false,
           employeeById:action.payload.employeeById,
           isEmployeeCreated:true
       }
  },
  newEmployeeFail(state,action){
     return{
        ...state,
       loading:false,
       error:action.payload,
       isEmployeeCreated:false
     }
},
clearEmployeeCreated(state,action){
    return{
        ...state,
        isEmployeeCreated:false
    }
},

deleteEmployeeRequest(state,action){
            
    return{
        ...state,
       loading:true
    }
},
deleteEmployeeSuccess(state,action){
   return{
    ...state,
       loading:false,
       //employeeById:action.payload.employeeById,
       isEmployeeDeleted:true
   }
},
deleteEmployeeFail(state,action){
 return{
    ...state,
   loading:false,
   error:action.payload,
  
 }
},
clearEmployeeDeleted(state,action){
return{
    ...state,
    isEmployeeDeleted:false
}
},

updateEmployeeRequest(state,action){
            
    return{
        ...state,
       loading:true
    }
},
updateEmployeeSuccess(state,action){
   return{
    ...state,
       loading:false,
       employeeById:action.payload.employeeById,
       isEmployeeUpdated:true
   }
},
updateEmployeeFail(state,action){
 return{
    ...state,
   loading:false,
   error:action.payload,
   isEmployeeUpdated:false
 }
},
clearEmployeeUpdated(state,action){
return{
    ...state,
    isEmployeeUpdated:false
}
},

createReviewRequest(state,action){
            
    return{
        ...state,
       loading:true
    }
},
createReviewSuccess(state,action){
   return{
      ...state,
       loading:false,
       isReviewSubmitted:true
       
   }
},
createReviewFail(state,action){
 return{
    ...state,
   loading:false,
   error:action.payload
 }
},
clearError(state,action){
    return{
        ...state,
        error:null
    }
},
clearReviewSubmitted(state,action){
    return{
        ...state,
        isReviewSubmitted:false
    }
},

reviewsRequest(state,action){
            
    return{
       ...state,
       loading:true
    }
},
reviewsSuccess(state,action){
   return{
       ...state,
       loading:false,
       reviews:action.payload.reviews
       
   }
},
reviewsFail(state,action){
 return{
   ...state,
   loading:false,
   error:action.payload
 }
},


deleteReviewRequest(state,action){
            
    return{
        ...state,
       loading:true
    }
},
deleteReviewSuccess(state,action){
   return{
    ...state,
       loading:false,
       //employeeById:action.payload.employeeById,
       isReview:true
   }
},
deleteReviewFail(state,action){
 return{
    ...state,
   loading:false,
   error:action.payload,
  
 }
},


clearReviewDeleted(state,action){
    return{
        ...state,
        isReviewDeleted:false
    }
    },




}});

const {actions,reducer}=employeeSlice;

export const{employeeRequest,employeeFail,employeeSuccess,newEmployeeRequest,newEmployeeSuccess,newEmployeeFail,clearEmployeeCreated,deleteEmployeeRequest,deleteEmployeeSuccess,deleteEmployeeFail,clearEmployeeDeleted,updateEmployeeRequest,updateEmployeeSuccess,updateEmployeeFail,clearEmployeeUpdated,createReviewRequest,createReviewFail,createReviewSuccess,clearError,clearReviewSubmitted,reviewsRequest,reviewsSuccess,reviewsFail,deleteReviewRequest,deleteReviewSuccess,deleteReviewFail,clearReviewDeleted}=actions

export default reducer;