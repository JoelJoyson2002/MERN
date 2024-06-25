import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice"
import axios from 'axios'
export const addCartItem=(id,quantity)=>async(dispatch)=>{
    try{
        dispatch(addCartItemRequest())
        const {data}=await axios.get(`/api/v1/emp/empid/${id}`)
        console.log("dta",data)
        dispatch(addCartItemSuccess({
            employee:data.employeeById._id,
            name:data.employeeById.name,
            charge:data.employeeById.serviceCharge,
            image:data.employeeById.images[0].Filename,
            age:data.employeeById.age,
            rating:data.employeeById.rating,
            review:data.employeeById.review,
            contact:data.employeeById.contact,
            email:data.employeeById.email,
            star_rating:data.employeeById.star_rating,
            service_type:data.employeeById.service_type,
            quantity:1

        }))
    }
    catch(error){

    }
}