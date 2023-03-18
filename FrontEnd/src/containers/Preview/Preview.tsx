import React, { useEffect, useState, useMemo } from "react";
import laptop from "../../assets/lenovo.png";
import logo from "../../assets/2298622371.svg";
import Cart from "../../assets/Cart.png";
import "./Preview.scss";
import { Link } from "react-router-dom";
import backArrow from "../../assets/backArrow.png";
import Spinner from "../../spinner/Spinner";

interface Product {
  name: string;
  price: number;
  Quantity: number;
  id: string;
}
const Preview: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const previewProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://63c169e471656267187a85ea.mockapi.io/productsTable`
        );
        const resJson: Product[] = await res.json();
        setProducts(resJson);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    previewProducts();
  }, []);

  const elements = useMemo(
    () =>
      products.map(({ name, price, Quantity, id }) => (
        <Link to={`/preview/${id}`} key={id}>
          <div className="card">
            <div className="card_img_h">
              <div className="card_img">
                <img src={laptop} alt="product" />
              </div>
              <div className="card_h">
                {name.length > 0 ? name : "No info..."}
              </div>
            </div>
            <div className="card_price">
              <div className="left">
                {price > 0 ? `${price}$` : "No info..."}
              </div>
              <div className="right">
                Quantity: {Quantity > 0 ? Quantity : 0}
              </div>
            </div>
            <div className="card_cart">
              <div className="cart_img">
                <img src={Cart} alt="Cart" />
              </div>
              <div>Ready to delivery!</div>
            </div>
          </div>
        </Link>
      )),
    [products]
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="logo_and_cards">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Link to="/products">
            <div className="SingleBack">
              <img src={backArrow} alt={"Back"} />
            </div>
          </Link>
          <div className="cards_grid"> {elements}</div>
        </div>
      )}
    </>
  );
};

export default Preview;
