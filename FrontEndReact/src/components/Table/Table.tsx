import React from "react";
import Table from "react-bootstrap/Table";
import arrow from "../../assets/arrow.svg";
import pen from "../../assets/pen.svg";
import box from "../../assets/box.svg"
import { v4 as uuid } from 'uuid'
import "./Table.scss";

interface Props {
  products: {
    Category: string;
    name: string;
    Quantity: number;
    price: string | number;
    id: number ;
  }[];
  ToggleDeleteProduct: (e: React.MouseEvent<HTMLImageElement>, id: number) => void;
  ToggleEditProduct: (id: number) => void;
}


const TableData:React.FC<Props> = ({products, ToggleDeleteProduct, ToggleEditProduct}) => {
  const element = products.map(({ Category, name, Quantity, price, id }) => (
    <tbody style={{ background: "#D9D9D9" }} key={uuid()}>
      <tr>
        <td>{id}</td>
        <td>{Category}</td>
        <td>{name}</td>
        <td>{Quantity}</td>
        <td>{price}</td>
        <td>
          <img src={pen} alt="edit"  onClick={() => ToggleEditProduct(id)} />
          <img
            src={box}
            alt="del"
            className="delete"
            onClick={(e) => ToggleDeleteProduct(e, id)}
          />
        </td>
      </tr>
    </tbody>
  ));
  return (
    <>
      <div className="tableContainer">
        <Table responsive="sm">
          <thead>
            <tr>
              <th>
                ID <img src={arrow} alt="arrow" />{" "}
              </th>
              <th>
                Category <img src={arrow} alt="arrow" />
              </th>
              <th>
                Name <img src={arrow} alt="arrow" />
              </th>
              <th>
                Quantity <img src={arrow} alt="arrow" />
              </th>
              <th>
                Price <img src={arrow} alt="arrow" />
              </th>
              <th>Tools</th>
            </tr>
          </thead>
          {element}
        </Table>
      </div>
    </>
  );
};

export default TableData;

