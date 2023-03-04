import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginForm.scss";
import myImage from "../../assets/2298622371.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const togglePlaceholder = () => {
    setShowPlaceholder(!showPlaceholder);
  };

  return (
    <div className="formBack"><div className="form">
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
      onSubmit={(values) => {
        console.log(values);
      }}
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
              <VisibilityOffIcon alt="Show/hide" onClick={togglePlaceholder}></VisibilityOffIcon>
            )}
          </div>
          <ErrorMessage className="error" name="password" component="div" />
        </div>

        <Link to="/products">
          <div className="logInButton" id="logInButton">
            <button type="submit">Log in</button>
          </div>
        </Link>
      </Form>
    </Formik>
  </div></div>
    
  );
};

export default LoginForm;



  