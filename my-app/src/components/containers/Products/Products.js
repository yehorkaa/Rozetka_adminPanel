import React, { useEffect, useState, useContext } from "react";
import NewInfoForm from "./NewInfoForm/FormTable";
import info from "../Products/Products.scss";
import Man from "../../assets/Man.svg";
import DeleteForm from "./DeleteForm/DeleteForm";
import Plus from "../../assets/plus.svg";
import { Link } from "react-router-dom";
import logo from "../../assets/2298622371.svg";
import Button from "react-bootstrap/Button";
import TableData from "./Table/Table";

import useApiRequest from "../../../hooks/httpHook";
import { MyContext } from "../../app/App";
import Header from "./Header/Header";
import { object } from "yup";
const Products = () => {
  const [editId, setEditId] = useState(null);
  const [edited, setEdited] = useState({});
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isOpen = editId || showAdd;

  const request = `https://63c169e471656267187a85ea.mockapi.io/productsTable `;
  useEffect(() => {
    console.log("gs");
    fetch(request)
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, [request]);

  const removeElement = async () => {
    const response = await fetch(
      `https://63c169e471656267187a85ea.mockapi.io/productsTable/${deleteId}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    setDelete(!setDelete);
    setProducts(products.filter((element) => element.id !== deleteId));
  };

  const ToggleAddProduct = (e) => {
    e.preventDefault();
    console.log("I am add");
    setShowAdd(!showAdd);
    setIsEditing(isEditing)
  };

  const ToggleDeleteProduct = (e, id) => {
    console.log(id);
    e.preventDefault();
    console.log("I am delete");
    setDeleteId(id);
    setDelete(!showDelete);
  };

  const ToggleEditProduct = (id) => {
    setEditId(id);
    setEdited(products.find((product) => product.id === id));
    setIsEditing(true);
  };
  
  

  const handleClose = () => {
    setShowAdd(false);
    setEditId(null);
    setIsEditing(false);
  };

  const addProduct = async (object) => {
    try {
      const response = await fetch(request, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
    } catch (error) {
      console.log(error);
    }

    console.log("I am addProduct");
  };

  const editProduct = async (object, id) => {
    const response = await fetch( `https://63c169e471656267187a85ea.mockapi.io/productsTable/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    setProducts(products.map((product) => product.id === id ? { ...product, ...object } : product));
  };
  

  return (
    <>
    <div className="ProductTools">    {isOpen ? (
        <NewInfoForm
          addProduct={addProduct}
          editProduct={editProduct}
          handleClose={handleClose}
          edited={edited}
          isEditing={isEditing}
        />
      ) : null}
      <div
        style={{
          zIndex: isOpen ? "-2" : 1,
          position: isOpen ? "relative" : "initial",
          opacity: isOpen ? 0.1 : 1,
        }}
      >
        <Header ToggleAddProduct={ToggleAddProduct} isEditing={isEditing} />
        <TableData
          products={products}
          removeElement={removeElement}
          ToggleDeleteProduct={ToggleDeleteProduct}
          ToggleEditProduct={ToggleEditProduct}
          isOpen={isOpen}
        />
        {showDelete ? (
          <DeleteForm
            ToggleDeleteProduct={ToggleDeleteProduct}
            removeElement={removeElement}
          />
        ) : null}
      </div></div>
  
    </>
  );
};

export default Products;

// {showForm ? (
//   <NewInfoForm
//     editElement={editElement}
//     onToggle={onToggle}
//     isContainerEnabled={isContainerEnabled}
//   />
// ) : (
//   <div
//     className="container"
//     // style={{ opacity: isContainerEnabled ? 0.3 : 1 }}
//   >
//     <div className="header">
//       <div className="logoAndButton">
//         <div className="logo">
//           <img src={logo} alt="Logo" />
//         </div>
//         <Link to="/preview" className="preview">
//           <Button
//             variant="primary"
//             size="lg"
//             active
//             className="preview_inside"
//           >
//             <img src={Man} alt="Man" />
//             <span>Preview</span>
//           </Button>{" "}
//         </Link>
//       </div>
//       <div className="products_h">
//         <h1>Products</h1>
//       </div>
//       <div className="addButton">
//         <Button
//           variant="primary"
//           size="lg"
//           active
//           className="add_inside"
//           onClick={onToggle}
//         >
//           <img src={Plus} alt="Man" />
//           <span>Add Product</span>
//         </Button>
//       </div>
//     </div>
//     <TableData
//       products={products}
//       request={request}
//       formData={formData}
//     />
//   </div>
// )}
