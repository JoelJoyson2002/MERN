import { createSlice } from "@reduxjs/toolkit";


const empResponseSlice=createSlice({
    name:'empresponse',
    initialState:{
        loading:true,
        empres:[],
        getempres:[],
        isResponseSent:false,
        feedbackLinkSent:false,
        feedbackLinkReceived:false,
        feedbacks:[]

        
    },
    reducers:{
      empresponseRequest(state,action){
            
             return{
                ...state,
                loading:true,
                
             }
       },
       empresponsetSuccess(state,action){
            return{
                loading:false,
                isResponseSent:true,
                
                empres:action.payload.response
                
            }
       },
      empresponseFail(state,action){
          return{
            ...state,
            isResponseSent:false,
            loading:false,
            
            error:action.payload
          }
    },
    clearError(state,action){
        return{
            error:null,
            
            
        }
    },

    clearEmpresponseCreated(state,action){
        return{
            ...state,
            isResponseSent:false
        }
        },

        getEmployeeResponseRequest(state,action){
            return{
                  ...state,
                  loading:true

            }
        },

        getEmployeeResponseSuccess(state,action){
            return{
                ...state,
                loading:false,
                getempres:action.payload.empresponse

            }
        },
        getEmployeeResponseFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
                

            }
        },


        sendFeedbackRequest(state,action){
            
            return{
               ...state,
               loading:true,
               
            }
      },
      sendFeedbackSuccess(state,action){
           return{
               loading:false,
               feedbackLinkSent:true
               
               
               
               
           }
      },
     sendFeedbackFail(state,action){
         return{
           ...state,
           feedbackLinkSent:false,
           loading:false,
           
           error:action.payload
         }
   },

   clearFeedbackError(state,action){
    return{
        error:null,
        
        
    }
},

clearFeedbackCreated(state,action){
    return{
        ...state,
        feedbackLinkSent:false
    }
    },


    ReceiveFeedbackRequest(state,action){
            
        return{
           ...state,
           loading:true,
           
        }
  },
  ReceiveFeedbackSuccess(state,action){
       return{
           loading:false,
           feedbackLinkReceived:true,
           Received:action.payload.response
           
           
           
           
       }
  },
 ReceiveFeedbackFail(state,action){
     return{
       ...state,
       feedbackLinkReceived:false,
       loading:false,
       
       error:action.payload
     }
},

clearReceiveFeedbackError(state,action){
return{
    error:null,
    
    
}
},

clearReceiveFeedbackCreated(state,action){
    return{
        ...state,
        feedbackLinkReceived:false
    }
    },

    GetFeedbackRequest(state,action){
            
        return{
           ...state,
           loading:true,
           
        }
  },
  GetFeedbackSuccess(state,action){
       return{
           loading:false,
          
           feedbacks:action.payload.feedbacks
           
           
           
           
       }
  },
 GetFeedbackFail(state,action){
     return{
       ...state,
      
       loading:false,
       
       error:action.payload
     }
},


}})

const {actions,reducer}=empResponseSlice;

export const{empresponseRequest,empresponsetSuccess,empresponseFail,clearError,clearEmpresponseCreated,getEmployeeResponseRequest,getEmployeeResponseSuccess,getEmployeeResponseFail,sendFeedbackRequest,sendFeedbackSuccess,sendFeedbackFail,clearFeedbackError,clearFeedbackCreated,ReceiveFeedbackRequest,ReceiveFeedbackSuccess,ReceiveFeedbackFail,clearReceiveFeedbackError,clearReceiveFeedbackCreated,GetFeedbackRequest,GetFeedbackSuccess,GetFeedbackFail}=actions;

export default reducer;