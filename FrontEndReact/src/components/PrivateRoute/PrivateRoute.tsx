import React from "react";
import { Outlet, Navigate } from "react-router-dom";



const PrivateRoute:React.FC = () => {
    if(!localStorage.getItem('token')) {
      return <Navigate to={'/login'} replace />
    }
  
    return <Outlet />
  };
  
  export default PrivateRoute;