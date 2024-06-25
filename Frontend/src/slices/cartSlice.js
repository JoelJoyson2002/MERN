
import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        loading:false,
        shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):[]
    },
    reducers:{
       addCartItemRequest(state,action){
        
        const plainState = JSON.parse(JSON.stringify(state));
         console.log("plain state", plainState);
            
             return{
                ...state,
                
               
        
                loading:true
             }
       },
       addCartItemSuccess(state,action){
        console.log("kio",state)

        /*const item=action.payload
        const isItemExist=state.items.find(i=>i.employee==item.employee)
        if(isItemExist){
            state={
                ...state,
                loading:false,
            }
        }else{*/
        const item=action.payload
            state={
                ...state,
                items:[...state.items,item],
                loading:false

            }
            console.log("state",state.items)
            localStorage.setItem('cartItems',JSON.stringify(state.items));
            

            const plain = JSON.parse(JSON.stringify(state));
         console.log("plain", plain);
        
        return state
            
       },
       saveShippingInfo(state,action){
        const newShippingInfo = action.payload;

  localStorage.setItem('shippingInfo', JSON.stringify(newShippingInfo));

          //localStorage.setItem('shippingInfo',JSON.stringify(action.payload))
          return{
            ...state,
            shippingInfo:newShippingInfo
          }
       },
       clearLocalStorage(state, action) {
        console.log("vegeta")
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingInfo');
        state.items = [];
        state.shippingInfo = [];
      },
      orderCompleted(state,action){
        

  localStorage.removeItem('shippingInfo');
  localStorage.removeItem('cartItems');
  sessionStorage.removeItem('orderInfo');

          //localStorage.setItem('shippingInfo',JSON.stringify(action.payload))
          return{
            items:[],
            loading:false,
            shippingInfo:{}
          }

       },

}});

const {actions,reducer}=cartSlice;

export const{addCartItemRequest,addCartItemSuccess,saveShippingInfo,clearLocalStorage,orderCompleted}=actions

export default reducer;