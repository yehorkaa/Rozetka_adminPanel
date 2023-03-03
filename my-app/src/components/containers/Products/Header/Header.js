import React, { useState } from "react";
import Man from "../../../assets/Man.svg";
import logo from "../../../assets/2298622371.svg";

import Plus from "../../../assets/plus.svg";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

const Header = (props) => {
console.log(props)
  return (
    <div
      className="container"
    >
      <div className="header">
        <div className="logoAndButton">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <Link to="/preview" className="preview">
            <Button
              variant="primary"
              size="lg"
              active
              className="preview_inside"
            >
              <img src={Man} alt="Man" />
              <span>Preview</span>
            </Button>{" "}
          </Link>
        </div>
        <div className="products_h">
          <h1>Products</h1>
        </div>
        <div className="addButton">
          <Button
            variant="primary"
            size="lg"
            active
            className="add_inside"
            onClick={ props.ToggleAddProduct}
          >
            <img src={Plus} alt="Man" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
