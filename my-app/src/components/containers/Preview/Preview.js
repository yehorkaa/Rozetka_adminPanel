import React, { useEffect, useState } from "react";
import laptop from "../../assets/lenovo.png";
import logo from "../../assets/2298622371.svg";
import Cart from "../../assets/Cart.png";
import PreviewSingle from "./PreviewSingle/PreviewSingle";
import "./Preview.scss";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import backArrow from "../../assets/backArrow.png";
const Preview = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch(`https://63c169e471656267187a85ea.mockapi.io/productsTable`)
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, []);


  const elements = products.map(({ name, price, Quantity, id }) => (
    <Link to={`/preview/${id}`} key={id}>
      <div className="card">
        <div className="card_img_h">
          <div className="card_img">
            <img src={laptop} alt="product" />
          </div>
          <div className="card_h">{name.length > 0 ? name : "No info..."}</div>
        </div>
        <div className="card_price">
          <div className="left">{price > 0 ? `${price}$` : "No info..."}</div>
          <div className="right">Quantity: {Quantity > 0 ? Quantity : 0}</div>
        </div>
        <div className="card_cart">
          <div className="cart_img">
            <img src={Cart} alt="Cart" />
          </div>
          <div>Ready to delivery!</div>
        </div>
      </div>
    </Link>
  ));

  return (
    <>
      <div className="logo_and_cards">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Link to='/products'>
        <div className="SingleBack">
            <img src={backArrow} alt={"Back"} />
          </div>
        </Link>
        <div className="cards_grid"> {elements}</div>
      </div>
    </>
  );
};

export default Preview;
