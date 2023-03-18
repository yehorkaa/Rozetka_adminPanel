
import { Formik, Form, Field } from "formik";
import React, { useState} from "react";
import ClearIcon from "@mui/icons-material/Clear";

import "./FormTable.scss";
import Spinner from "spinner/Spinner";

interface FormData {
  id: number;
  Category: string;
  name: string;
  Quantity: number;
  price: string | number;
  description: string;
};


type Props = {
  addProduct: (formData: FormData) => void;
  handleClose: () => void;
  edited: FormData;
  editProduct: (formData: FormData, id: number) => void;
  isEditing: boolean;
  loading: boolean;
};

const NewInfoForm: React.FC<Props> = ({
  addProduct,
  handleClose,
  edited,
  editProduct,
  isEditing,
  loading
}) => {
  console.log(edited);
  const [formData, setFormData] = useState<FormData>({
    id: edited.id || 0,
    Category: edited.Category || "",
    name: edited.name || "",
    Quantity: edited.Quantity || 0,
    price: edited.price || 0,
    description: edited.description || "",
  });
  

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const initialValues: FormData = {
    id: +"",
    Category: "",
    name: "",
    Quantity: +"",
    price: "",
    description: "",
  };

  const handleSubmit = () => {
    if (isEditing) {
      editProduct(formData, edited.id);

    } else {
      addProduct(formData);
    }
    handleClose();
  };
  
  console.log(isEditing)
  const formTitle = isEditing ? "Edit Product" : "Add Product";

  return (
    <>
    {loading ? <Spinner/> : <div className="form-table-container">
        <Formik initialValues={initialValues}  onSubmit={handleSubmit}>
          <Form id="Form">
            <div className="Action">
              <h2>{formTitle}</h2>
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
      </div> }
      
    </>
  );
};

export default NewInfoForm;