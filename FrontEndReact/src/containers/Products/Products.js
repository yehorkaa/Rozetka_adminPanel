import React, { useEffect, useState} from "react";
import NewInfoForm from "../../components/NewInfoForm/FormTable";
import DeleteForm from "../../components/DeleteForm/DeleteForm";
import TableData from "../../components/Table/Table"
import Spinner from "../../spinner/Spinner"
import Header from "../../components/Header/Header"
import './Products.scss'
const Products = () => {
  const [editId, setEditId] = useState(null);
  const [edited, setEdited] = useState({});
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const isOpen = editId || showAdd;

  const request = `https://63c169e471656267187a85ea.mockapi.io/productsTable `;
  useEffect(() => {
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
    setIsEditing(isEditing);
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
  };

  const editProduct = async (object, id) => {
    const response = await fetch(
      `https://63c169e471656267187a85ea.mockapi.io/productsTable/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      }
    );
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...object } : product
      )
    );
  };

  return (
    <>
      <div className="ProductTools">
        {" "}
        {isOpen ? (
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
          {isLoading ? <Spinner/> : (
            <TableData
              products={products}
              removeElement={removeElement}
              ToggleDeleteProduct={ToggleDeleteProduct}
              ToggleEditProduct={ToggleEditProduct}
              isOpen={isOpen}
            />
          )}
          {showDelete ? (
            <DeleteForm
              ToggleDeleteProduct={ToggleDeleteProduct}
              removeElement={removeElement}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Products;
