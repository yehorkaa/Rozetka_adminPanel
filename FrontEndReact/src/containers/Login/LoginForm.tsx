import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import myImage from "../../assets/2298622371.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface User {
  name: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<boolean>(false);

  const togglePlaceholder = () => {
    setShowPlaceholder(!showPlaceholder);
  };
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
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
  }, []);

  const handleSubmit = (values: { userName: string; password: string }) => {
    
    const matchingUser = users.find(
      (user) => user.name === values.userName && user.password === values.password
    );
    if (matchingUser) {
      navigate("/products", { replace: true });
      localStorage.setItem("token", '123456');
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
          validationSchema={Yup.object({
            userName: Yup.string()
              .min(2, "At least 2 symbols")
              .required("Empty field"),
            password: Yup.string().required("Empty field"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="formik">
            <div className="fieldContainer">
              <Field
                id="userName"
                name="userName"
                type="text"
                placeholder="User Name"
                className="inpUser"
              />
              <ErrorMessage className="error" name="userName" component="div" />
            </div>
            <div className="fieldContainer">
              <Field
                id="password"
                name="password"
                type={showPlaceholder ? "text" : "password"}
                placeholder="Password"
                className="passWord"
              />

              <div className="eyeImg">
                {showPlaceholder ? (
                  <VisibilityIcon
                    component="svg"
                    onClick={togglePlaceholder}
                  />
                ) : (
                  <VisibilityOffIcon
                    component="svg"
                    onClick={togglePlaceholder}
                  />
                )}
              </div>

              <ErrorMessage className="error" name="password" component="div" />
            </div>
            <button className="logInButton" id="logInButton" type="submit">
              Log in
            </button>
            {error && <div className="error-message">Incorrect data</div>}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
