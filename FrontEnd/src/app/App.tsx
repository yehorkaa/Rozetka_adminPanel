import React from "react";
import LoginForm from "../containers/Login/LoginForm";
import Products from "../containers/Products/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "../containers/Preview/Preview";
import PreviewSingle from "../components/PreviewSingle/PreviewSingle";

import ErrorPage from "components/ErrorPage/ErrorPage";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

import "./App.scss";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/preview/:id" element={<PreviewSingle />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
