import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import ClearIcon from "@mui/icons-material/Clear";


import "./FormTable.scss";

const NewInfoForm = ({ addProduct, handleClose, edited, editProduct,isEditing }) => {
  console.log(edited)
  const [formData, setFormData] = useState({
    Category: edited.Category || "",
    name: edited.name || "",
    Quantity: edited.Quantity || "",
    price: edited.price || "",
    description: edited.description || "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const initialValues = {
    Category: "",
    Name: "",
    Quantity: "",
    price: "",
    description: "",
  };

  // const method = isEditing ?  editProduct(formData, edited.id) : addProduct(formData)
  // console.log(method)
  const doThis = () => {
    if(isEditing) {
      editProduct(formData, edited.id) 
    } else {
      addProduct(formData)
    }
  }
  console.log(formData)
  return (
    <>
      <div className="form-table-container">
        <Formik initialValues={initialValues}>
          <Form id="Form" onSubmit={() => doThis()}>
            <div className="Action">
              <h2>{isEditing ? 'Edit product' : 'Add product'}</h2>
              <div className="closeImg" onClick={handleClose}>
                <ClearIcon />
              </div>
            </div>
            <div id="FormContainer">
              <Field
                id="Category"
                type="text"
                value={formData.Category}
                onChange={handleFormChange}
                name="Category"
                placeholder={"Category"}
              />

              <Field
                id="Name"
                type="text"
                name="name"
                placeholder={"Name"}
                value={formData.name}
                onChange={handleFormChange}
              />
              <Field
                id="Quantity"
                type="number"
                value={formData.Quantity}
                onChange={handleFormChange}
                name="Quantity"
                placeholder={"Quantity"}
              />
              <Field
                id="price"
                type="text"
                name="price"
                placeholder={"Price"}
                value={formData.price}
                onChange={handleFormChange}
              />
              <Field
                id="Description"
                type="text"
                name="description"
                placeholder={"Description"}
                value={formData.description}
                onChange={handleFormChange}
              />
              <div className="SubmitORCancel">
                <button className="cancelBtn" onClick={handleClose}>
                  cancel
                </button>
                <button className="submitBtn" type="submit">
                  submit
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default NewInfoForm;
