import React from "react";
import './Delete.scss';

interface DeleteFormProps {
  removeElement: () => void;
  ToggleDeleteProduct: any
}

const DeleteForm: React.FC<DeleteFormProps> = ({ removeElement, ToggleDeleteProduct }) => {
  return (
    <div className="DeleteFormContainer">
      <div className="DeleteQuestion">
        <span>Are you sure you want to delete this product?</span>
      </div>
      <div className="DeleteButtons">
      <button className="cancelDelete" onClick={() => ToggleDeleteProduct(null)}>Cancel</button>

        <button className="DeleteDelete" type='submit' onClick={removeElement}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteForm;
