import React, { useContext, useEffect, useState } from "react";
import LoginForm from "../containers/Login/LoginForm";
import Products from "../containers/Products/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "../containers/Preview/Preview";
import PreviewSingle from "../containers/Preview/PreviewSingle/PreviewSingle";
import TableData from "../containers/Products/Table/Table";
import "./App.scss";
import { Suspense } from "react";

export const MyContext = React.createContext([]);

const App = () =>  {
  return (
    <MyContext.Provider value={""}>
      <Router>
        <>
          <Suspense>
            <Routes>
              <Route path="/" element={<LoginForm className="login" />} />

              <Route
                path="/products"
                element={<Products className="products" />}
              />

              <Route
                path="/preview"
                element={<Preview className="preview"></Preview>}
              />
              <Route path="/preview/:id" element={<PreviewSingle />} />
            </Routes>
          </Suspense>
        </>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
