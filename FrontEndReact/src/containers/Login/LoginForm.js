import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginForm.scss";
import myImage from "../../assets/2298622371.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [user, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const togglePlaceholder = () => {
    setShowPlaceholder(!showPlaceholder);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://63c169e471656267187a85ea.mockapi.io/users"
        );
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (values) => {
    const matchingUser = user.find(
      (u) => u.name === values.userName && u.password === values.password
    );
  
    if (matchingUser) {
      window.location.href = "/products";

    }
    setError(true);
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
                  <VisibilityIcon alt="Show/hide" onClick={togglePlaceholder} />
                ) : (
                  <VisibilityOffIcon
                    alt="Show/hide"
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
