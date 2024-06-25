import axios from "axios"
import { adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, changeDateOrderFail, changeDateOrderRequest, changeDateOrderSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrdersFail, deleteOrdersRequest, deleteOrdersSuccess, employeeOrdersFail, employeeOrdersRequest, employeeOrdersSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrdersFail, updateOrdersRequest, updateOrdersSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from "../slices/orderSlice"
import { deleteEmployeeSuccess } from "../slices/employeeSlice"

export const createOrder=order=>async(dispatch)=>{
    try{
        console.log("bum")
        dispatch(createOrderRequest())
        console.log("vex",order)
        const{data}=await axios.post('/api/v1/book/new',order)
        console.log("datea",data)
        dispatch(createOrderSuccess(data))
    }
    catch(error){
          dispatch(createOrderFail(error.response.data.message))
    }
}


export const userOrders=async(dispatch)=>{
    try{
        dispatch(userOrdersRequest())
        const{data}=await axios.get('/api/v1/book/allsingleuserbookings')
        console.log("datea",data)
        dispatch(userOrdersSuccess(data))
    }
    catch(error){
          dispatch(userOrdersFail(error.response.data.message))
    }
}


export const orderDetail=id=>async(dispatch)=>{
    try{
        dispatch(orderDetailRequest())
        const{data}=await axios.get(`/api/v1/book/singlebooking/${id}`)
        console.log("datea",data)
        dispatch(orderDetailSuccess(data))
    }
    catch(error){
          dispatch(orderDetailFail(error.response.data.message))
    }
}

export const ChangeorderDetail=(empid,time)=>async(dispatch)=>{
    try{
        dispatch(changeDateOrderRequest())
        console.log("timmmme",time)
        const{data}=await axios.put(`/api/v1/changedate?empid=${empid}&time=${time}`)
        console.log("dateaaaaaaaaa",data)
        dispatch(changeDateOrderSuccess(data))
    }
    catch(error){
          dispatch(changeDateOrderFail(error.response.data.message))
    }
}


export const adminOrders=async(dispatch)=>{
    try{
        dispatch(adminOrdersRequest())
        const{data}=await axios.get('/api/v1/admin/bookings')
        console.log("datea",data)
        dispatch(adminOrdersSuccess(data))
    }
    catch(error){
          dispatch(adminOrdersFail(error.response.data.message))
    }
}


export const deleteOrders=id=>async(dispatch)=>{
    try{
        dispatch(deleteOrdersRequest())
        await axios.delete(`/api/v1/admin/bookings/deletebooking/${id}`)
        console.log("success")
       
        dispatch(deleteOrdersSuccess())
    }
    catch(error){
          dispatch(deleteOrdersFail(error.response.data.message))
    }
}


export const updateOrders=(id,orderData)=>async(dispatch)=>{
    try{
        dispatch(updateOrdersRequest())
       const{data}= await axios.put(`/api/v1/admin/bookings/update/${id}`,orderData)
       
        dispatch(updateOrdersSuccess(data))
    }
    catch(error){
          dispatch(updateOrdersFail(error.response.data.message))
    }
}


export const EmployeeOrders=async(dispatch)=>{
    try{
        dispatch(employeeOrdersRequest())
        const{data}=await axios.get('/api/v1/book/allorders/employee')
        console.log("datea",data)
        dispatch(employeeOrdersSuccess(data))
    }
    catch(error){
          dispatch(employeeOrdersFail(error.response.data.message))
    }
}
