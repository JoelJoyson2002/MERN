import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserProfile from "../userprofile";

const ProtectedRoute=({children,isAdmin})=>{
      
    const{isAuthenticated,loading,user}=useSelector(state=>state.authState);

    useEffect(()=>{
        

    },[isAuthenticated])


    
    
   if(isAuthenticated){
    if(isAdmin===true && user.role!=='admin'){
            return <Navigate to="/login/"/>
    }
    return children;
   }
   
   if(isAuthenticated==false && !loading){
    console.log(isAuthenticated);
    return <Navigate to="/login"/>
}

   if(loading){
       return "please wait"
   }


}

export default ProtectedRoute;