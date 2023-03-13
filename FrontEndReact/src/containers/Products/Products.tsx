import React, { useEffect, useState } from "react";
import NewInfoForm from "../../components/NewInfoForm/FormTable";
import DeleteForm from "../../components/DeleteForm/DeleteForm";
import TableData from "../../components/Table/Table";

import Header from "../../components/Header/Header";
import "./Products.scss";

interface ProductObject {
  Category: string;
  name: string;
  Quantity: number;
  price: string | number;
  id: number;
}

interface ProductFormData extends ProductObject {
  description: string;
};

const Products: React.FC = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductObject[]>([]);
  const [edited, setEdited] = useState<any>({});

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showDelete, setDelete] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    const res = await response.json();
    console.log(res);
    setDelete(!showDelete);
    setProducts(products.filter((element: any) => element.id !== deleteId));
  };

  const ToggleAddProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("I am add");
    setShowAdd(!showAdd);
    setIsEditing(isEditing);
  };

  const ToggleDeleteProduct = (e: React.MouseEvent<HTMLButtonElement | HTMLImageElement>, id: number | null) => {
    console.log(e);
    console.log("I am delete");
    setDeleteId(id);
    setDelete(!showDelete);
  };

  const ToggleEditProduct = (id: null | number) => {
    setEditId(id);
    setEdited(
      products.find((product: ProductObject) => product.id === id) as ProductObject
    );
    setIsEditing(true);
  };

  const handleClose = () => {
    setShowAdd(false);
    setEditId(null);
    setIsEditing(false);
  };

  const addProduct = async (product: ProductFormData) => {
    try {
      const response = await fetch(request, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      setProducts([...products, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = async (
    object: ProductObject,
    id: number
  ): Promise<void> => {
    fetch(`https://63c169e471656267187a85ea.mockapi.io/productsTable/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    setProducts(
      products.map((product: ProductObject) =>
        product.id === id ? { ...product, ...object } : product
      )
    );
  };

  return (
    <>
      <div className="ProductTools">
        {" "}
        <div
          style={{
            // zIndex: isOpen ? "-2" : 1,
            // position: isOpen ? "relative" : "initial",
            // opacity: isOpen ? 0 : 1,
          }}
        >
          <Header ToggleAddProduct={ToggleAddProduct} />

          <TableData
            products={products}
            ToggleDeleteProduct={ToggleDeleteProduct}
            ToggleEditProduct={ToggleEditProduct}
          />

          {showDelete ? (
            <DeleteForm
              ToggleDeleteProduct={ToggleDeleteProduct}
              removeElement={removeElement}
            />
          ) : null}
               {isOpen ? (
          <NewInfoForm
            addProduct={addProduct}
            editProduct={editProduct}
            handleClose={handleClose}
            edited={edited}
            isEditing={isEditing}
          />
        ) : null}
        </div>
      </div>
    </>
  );
};

export default Products;
