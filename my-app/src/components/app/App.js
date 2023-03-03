import React, {useContext, useEffect, useState} from "react";
import LoginForm from "../containers/Login/LoginForm";
import Products from "../containers/Products/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preview from "../containers/Preview/Preview";
import TableData from "../containers/Products/Table/Table";
import "./App.scss";
import { Suspense } from "react";

export const MyContext = React.createContext([]);

function App() {
  
  return (
    <MyContext.Provider value={''}>
      <Router>
        <>
          <section className="containerSec">
            <Suspense>
              <Routes>
                <Route
                  path="/"
                  element={<LoginForm className="login" />}
                ></Route>

                <Route
                  path="/products"
                  element={<Products className="products" />}
                ></Route>

                <Route
                  path="/preview"
                  element={<Preview className="preview"></Preview>}
                ></Route>
              </Routes>
            </Suspense>
          </section>
        </>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
