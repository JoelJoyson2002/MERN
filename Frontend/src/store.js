import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import employeesReducer from "./slices/employeesSlice"
import employeeReducer from "./slices/employeeSlice"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
import userReducer from "./slices/userSlice"
import employeeLoginReducer from "./slices/authEmployee"
import employeeresonseReducer from "./slices/employeeResponseSlice"

import getuserReducer from "./slices/getuserbyemployeeSlice"
const reducer=combineReducers({
      employeesState:employeesReducer,
      employeeState:employeeReducer,
      authState:authReducer,
      cartState:cartReducer,
      orderState:orderReducer,
      userState:userReducer,
      authEmployeeState:employeeLoginReducer,
      getuserbyempState:getuserReducer,
      empresponseState:employeeresonseReducer
})

const store=configureStore({
    reducer,
    middleware:[thunk]
})

export default store;