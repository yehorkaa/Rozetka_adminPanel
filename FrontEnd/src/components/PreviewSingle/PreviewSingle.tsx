import logo from "../../assets/2298622371.svg";
import backArrow from "../../assets/backArrow.png";
import laptop from "../../assets/lenovo.png";
import accept from "../../assets/accept.svg";
import { Link, useParams } from "react-router-dom";
import "./PreviewSingle.scss";
import Spinner from "spinner/Spinner";
import { useEffect, useState } from "react";

type Product = {
  id?: string;
  name: string;
  price: number;
  Quantity: number;
  description: string;
};

const PreviewSingle = () => {
  const [dataProduct, setDataProduct] = useState<Product | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const previewSingleProduct = async () => {
      try {
        const res = await fetch(
          `https://63c169e471656267187a85ea.mockapi.io/productsTable/${id}`
        );
        const resJson: Product = await res.json();
        setDataProduct(resJson);
      } catch (e) {
        console.log(e);
      }
    };
    previewSingleProduct();
  }, [id]);

  if (!dataProduct) {
    return <Spinner />;
  }
  const { name, price, Quantity, description } = dataProduct;

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

        <div className="SingleName">{name}</div>
      </div>

      <>
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
              <span>{price}$</span>
            </div>
            <div className="productQuantity">
              <span>{"Quantity: " + Quantity}</span>
            </div>
          </div>
        </div>
        <div className="bigDescriptionOfPr">
          <span>Description {name} </span>
          <p>
            {description.length > 0
              ? description
              : "There is no description..."}
          </p>
        </div>
      </>
    </div>
  );
};

export default PreviewSingle;


