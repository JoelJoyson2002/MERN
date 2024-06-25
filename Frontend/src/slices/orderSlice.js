
import { createSlice } from "@reduxjs/toolkit";


const orderSlice=createSlice({
    name:'order',
    initialState:{
        orderDetail:{},
        userOrders:[],
        adminOrders:[],
        EmployeeBook:[],
        isOrderDeleted:false,
        isOrderUpdated:false,
        loading:false
    },
    reducers:{
      createOrderRequest(state,action){
         return{
            ...state,
            loading:true
         }
      },
      createOrderSuccess(state,action){
        return{
           ...state,
           loading:false,
           orderDetail:action.payload.book
        }
     },
     createOrderFail(state,action){
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

     changeDateOrderRequest(state,action){
      return{
         ...state,
         loading:true
      }
   },
   changeDateOrderSuccess(state,action){
     return{
        ...state,
        loading:false,
        ChangedOrder:action.payload.updatedEmployee
     }
  },
  changeDateOrderFail(state,action){
     return{
        ...state,
        loading:false,
        error:action.payload
     }
  },


     userOrdersRequest(state,action){
      return{
         ...state,
         loading:true
      }
   },
   userOrdersSuccess(state,action){
     return{
        ...state,
        loading:false,
        userOrders:action.payload.bookings
     }
  },
  userOrdersFail(state,action){
     return{
        ...state,
        loading:false,
        error:action.payload
     }
  },

  orderDetailRequest(state,action){
   return{
      ...state,
      loading:true
   }
},
orderDetailSuccess(state,action){
  return{
     ...state,
     loading:false,
     orderDetail:action.payload
  }
},
orderDetailFail(state,action){
  return{
     ...state,
     loading:false,
     error:action.payload
  }
},

adminOrdersRequest(state,action){
   return{
      ...state,
      loading:true
   }
},
adminOrdersSuccess(state,action){
  return{
     ...state,
     loading:false,
     adminOrders:action.payload.bookings
  }
},
adminOrdersFail(state,action){
  return{
     ...state,
     loading:false,
     error:action.payload
  }
},

deleteOrdersRequest(state,action){
   return{
      ...state,
      loading:true
   }
},
deleteOrdersSuccess(state,action){
  return{
     ...state,
     loading:false,
     isOrderDeleted:true
  }
},
deleteOrdersFail(state,action){
  return{
     ...state,
     loading:false,
     error:action.payload
  }
},


updateOrdersRequest(state,action){
   return{
      ...state,
      loading:true
   }
},
updateOrdersSuccess(state,action){
  return{
     ...state,
     loading:false,
     isOrderUpdated:true
  }
},
updateOrdersFail(state,action){
  return{
     ...state,
     loading:false,
     error:action.payload
  }
},

clearOrderDeleted(state,action){
   return{
      ...state,
      isOrderDeleted:false
   }
},

clearOrderUpdated(state,action){
   return{
      ...state,
      isOrderUpdated:false
   }
},

employeeOrdersRequest(state,action){
   return{
         ...state,
         loading:true
   }
},

employeeOrdersSuccess(state,action){
   return{
      ...state,
      loading:false,
      EmployeeBook:action.payload.bookings
   }
},
employeeOrdersFail(state,action){
   return{
      ...state,
      loading:false,
     error:action.payload

   }
},
clearEmployeeOrders(state,action){
   return{
      ...state,
      error:null
   }
}
      

}});

const {actions,reducer}=orderSlice;

export const{
    createOrderFail,
    createOrderRequest,
    createOrderSuccess,
    clearError,
    userOrdersRequest,
    userOrdersSuccess,
    userOrdersFail,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    adminOrdersFail,
    deleteOrdersRequest,
    deleteOrdersSuccess,
    deleteOrdersFail,
    clearOrderDeleted,
    clearOrderUpdated,
    updateOrdersRequest,
    updateOrdersSuccess,
    updateOrdersFail,
    employeeOrdersRequest,
    employeeOrdersSuccess,
    employeeOrdersFail,
    clearEmployeeOrders,
    changeDateOrderRequest,
    changeDateOrderSuccess,
    changeDateOrderFail
}=actions

export default reducer;