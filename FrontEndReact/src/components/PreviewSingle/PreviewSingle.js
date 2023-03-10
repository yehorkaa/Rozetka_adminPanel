import React from "react";
import logo from "../../assets/2298622371.svg";
import backArrow from "../../assets/backArrow.png";
import laptop from "../../assets/lenovo.png";
import accept from "../../assets/accept.svg";
import { Link, useParams } from "react-router-dom";
import "./PreviewSingle.scss";
import { useEffect, useState } from "react";

const PreviewSingle = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://63c169e471656267187a85ea.mockapi.io/productsTable/${id}`)
      .then((res) => res.json())
      .then((res) => setDataProduct([res]));
  }, [id]);

  if (dataProduct.length === 0) {
    return <div className="Loading">Loading...</div>;
  }

  const element = dataProduct[0];

  return (
    <div className="SinglePreviewPage">
      <header className="header">
        <div className="singleLogo">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <div className="SingleData">
        <Link to="/preview">
          <div className="SingleBack">
            <img src={backArrow} alt={"Back"} />
          </div>
        </Link>

        <div className="SingleName">{element.name}</div>
      </div>
      <div className="laptopAndDescription">
        <div className="laptopImg">
          <img src={laptop} alt="Product" />
        </div>
        <div className="allRightDescription">
          <div className="acceptAndName">
            <div className="acceptImg">
              <img src={accept} alt="Commodity" />
            </div>

            <div className="acceptName">
              <span>The product is ready for you!</span>
            </div>
          </div>
          <div className="productCOst">
            <span>{element.price}$</span>
          </div>
          <div className="productQuantity">
            <span>{"Quantity: " + element.Quantity}</span>
          </div>
        </div>
      </div>
      <div className="bigDescriptionOfPr">
        <span>Description {element.name} </span>
        <p>
          {element.description.length > 0
            ? element.description
            : "There is no description..."}
        </p>
      </div>
    </div>
  );
};

export default PreviewSingle;
