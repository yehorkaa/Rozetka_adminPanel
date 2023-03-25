import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleClick = () => {
      if (!localStorage.getItem("token")) {
        navigate("/", { replace: true });
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [navigate]);

  return <Outlet />;
};

export default PrivateRoute;
