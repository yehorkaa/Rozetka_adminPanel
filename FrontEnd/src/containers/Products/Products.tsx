import React, { useEffect, useState, useCallback } from "react";
import NewInfoForm from "../../components/NewInfoForm/FormTable";
import DeleteForm from "../../components/DeleteForm/DeleteForm";
import Table from "../../components/Table/Table";
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
}

const Products: React.FC = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductObject[]>([]);
  const [edited, setEdited] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showDelete, setDelete] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isOpen = editId || showAdd;

  const request = `https://63c169e471656267187a85ea.mockapi.io/productsTable`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(request);
        const productsFetch = await response.json();
        setProducts(productsFetch);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [request]);

  const removeElement =  async () => {
    setLoading(true);
    try {
      const response = await fetch(`${request}/${deleteId}`, { method: "DELETE" });
      await response.json();
      setLoading(false);
      setDelete(!showDelete);
      setProducts(products.filter((element: any) => element.id !== deleteId));
    } catch (e) {
      console.log(e);
    }
  };

  const ToggleAddProduct = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setShowAdd(!showAdd);
      setIsEditing(false);
    },
    [showAdd]
  );
  
  
  const ToggleDeleteProduct = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLImageElement>, id: number | null) => {
      console.log(e);
      setDeleteId(id);
      setDelete(!showDelete);
    },
    [showDelete]
  );

  const ToggleEditProduct = useCallback(
    
    (id: null | number) => {
      setIsEditing(true);
      setEditId(id);
      setEdited(
        products.find(
          (product: ProductObject) =>
            product.id === id
        )
      );
    },
    [products]
  );

  const handleClose = () => {
    setShowAdd(false);
    setEditId(null);
    setIsEditing(false);
  };

  const addProduct = async (product: ProductFormData) => {
    setIsEditing(!isEditing);
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = async (object: ProductObject, id: number): Promise<void> => {
    const response = await fetch(`${request}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object), // отправляем измененный объект
    });
    const data = await response.json();
    setProducts(products.map((product: ProductObject) => product.id === id ? { ...data } : product));
  };
  
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  return (
    <>
      <div className="ProductTools" onClick={(e) => handleBackgroundClick(e)}>
        {" "}
        <Header ToggleAddProduct={ToggleAddProduct} />
        <Table
          loading={loading}
          products={products}
          ToggleDeleteProduct={ToggleDeleteProduct}
          ToggleEditProduct={ToggleEditProduct}
        />
        {showDelete ? (
          <DeleteForm
            ToggleDeleteProduct={ToggleDeleteProduct}
            removeElement={removeElement}
            loading={loading}
          />
        ) : null}
        {isOpen ? (
          <NewInfoForm
          addProduct={addProduct}
          editProduct={editProduct}
          handleClose={handleClose}
          isEditing={isEditing} 
          edited={edited}
          loading={loading}
        />
        
        ) : null}
      </div>
    </>
  );
};

export default Products;
