import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute: React.FC = (login = '/login') => {
  if(!localStorage.getItem('token')) {
    return <Navigate to={login} replace />
  }

  return <Outlet />
};

export default PrivateRoute;



// вариант с переходом на логин при клике, если нет токена
  // const navigate = useNavigate();
  
  // useEffect(() => {
  //   const handleClick = () => {
  //     if (!localStorage.getItem("token")) {
  //       navigate("/", { replace: true });
  //     }
  //   };

  //   document.body.addEventListener("click", handleClick);

  //   return () => {
  //     document.body.removeEventListener("click", handleClick);
  //   };
  // }, [navigate]);