import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
import { validationSchema } from "validation/validation";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.scss";
import myImage from "../../assets/2298622371.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface User {
  name: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<boolean>(false);


  const togglePlaceholder = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://63c169e471656267187a85ea.mockapi.io/users"
        );
        const fetchedUsers = await response.json();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();

    if (location.pathname === "/login") {
      localStorage.removeItem("token");
    }
  }, [location]);

  const handleSubmit = (values: { userName: string; password: string }) => {
    const matchingUser = users.find(
      (user) =>
        user.name === values.userName && user.password === values.password
    );
    if (matchingUser) {
      navigate("/products", { replace: true });
      localStorage.setItem("token", String(+new Date()));
    } else {
      setError(true);
    }
  };
  return (
    <div className="formBack">
      <div className="form">
        <div className="logotype">
          <img src={myImage} alt="Rozetka" />
        </div>
        <Formik
          initialValues={{
            userName: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
            {({ errors, touched }) => ( 
                 <Form className="formik">
                 <div className="fieldContainer">
                   <Field
                     id="userName"
                     name="userName"
                     type="text"
                     placeholder="User Name"
                     className="inpUser"
                    style={{
                      'borderColor': errors.userName && touched.userName ? '#B22222' : ''
                    }}
                   />
                   <ErrorMessage className="error" name="userName" component="span" />
                 </div>
                 <div className="fieldContainer">
                   <Field
                     id="password"
                     name="password"
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     className="passWord"
                     style={{
                      'borderColor': errors.password && touched.password ? '#B22222' : ''
                    }}
                   />
     
                   <div className="eyeImg">
                     {showPassword ? (
                       <VisibilityIcon component="svg" onClick={togglePlaceholder}  style={{
                        'color': errors.password && touched.password ? '#B22222' : ''
                      }} />
                     ) : (
                       <VisibilityOffIcon
                         component="svg"
                         onClick={togglePlaceholder}
                         style={{
                          'color': errors.password && touched.password ? '#B22222' : ''
                        }}
                       />
                     )}
                   </div>
     
                   <ErrorMessage className="error" name="password" component="span" />
                 </div>
                 <button className="logInButton" id="logInButton" type="submit" style={{'background': error ? '#B22222' : '' }}>
                   Log in
                 </button>
                 {error && <div className="error-message">Incorrect password or name</div>}
               </Form>
            )}
       
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
