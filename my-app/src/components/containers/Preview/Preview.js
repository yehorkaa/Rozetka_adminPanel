import React, { useEffect, useState } from "react";
import laptop from "../../assets/lenovo.png";
import logo from "../../assets/2298622371.svg";
import Cart from "../../assets/Cart.png";
import "./Preview.scss";

const Preview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://63c169e471656267187a85ea.mockapi.io/productsTable `)
      .then((res) => res.json())
      .then((res) => setProducts(res));
    setProducts(products);
  }, []);

  
  const elements = products.map(({ name, price, Quantity, id }) => (
    <div className="card" key={id}>
      <div className="card_img_h">
        <div className="card_img">
          <img src={laptop} alt="product" />
        </div>
        <div className="card_h">{name}</div>
      </div>
      <div className="card_price">
        <div className="left">{price}$</div>
        <div className="right">Quantity: {Quantity}</div>
      </div>
      <div className="card_cart">
        <div className="cart_img">
          <img src={Cart} alt="Cart" />
        </div>
        <div>Ready to delivery!</div>
      </div>
    </div>
  ));
  return (
    <div className="logo_and_cards">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="cards_grid">{elements}</div>
    </div>
  );
};

export default Preview;
