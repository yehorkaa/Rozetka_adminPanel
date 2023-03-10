import React from "react";
import './Delete.scss'
const DeleteForm = ({removeElement, ToggleDeleteProduct}) => {
    return (
        <div className="DeleteFormContainer">
            <div className="DeleteQuestion">
                <span>Are u sure want to delete this product?</span>
            </div>
            <div className="DeleteButtons">
                <button className="cancelDelete"  onClick={ToggleDeleteProduct}>Cancel</button>
                <button className="DeleteDelete" type='submit' onClick={removeElement} >Delete</button>
            </div>
        </div>
    )
}

export default DeleteForm