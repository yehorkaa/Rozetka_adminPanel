import React, { useContext, useEffect, useState } from "react";
import LoginForm from "../containers/Login/LoginForm";
import Products from "../containers/Products/Products";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Preview from "../containers/Preview/Preview";
import PreviewSingle from "../components/PreviewSingle/PreviewSingle";
import "./App.scss";
import { Suspense } from "react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? (
    <Routes>
      <Route {...rest} element={<Component />} />
    </Routes>
  ) : (
    navigate("/", { replace: true })
  );
};

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <ProtectedRoute path="/products" component={Products} />
        <ProtectedRoute path="/preview" component={Preview} />
        <ProtectedRoute path="/preview/:id" component={PreviewSingle} />
      </React.Fragment>
      <Routes>
        <Route path="/" element={<LoginForm className="login" />} />
      </Routes>
    </Router>
  );
};

export default App;
