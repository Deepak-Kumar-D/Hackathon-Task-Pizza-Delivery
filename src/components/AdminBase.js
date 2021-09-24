import React, { useState, useEffect, useContext } from "react";
import { showLoad } from "../App";
import { GridLoader } from "react-spinners";
import "../css/AdminProducts.css";
import axios from "axios";

function AdminBase() {
  const { loading, setLoading, setNav } = useContext(showLoad);
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(parseInt());
  let count = 0;

  const Increase = async (id, name, ele) => {
    if (ele < qty) {
      const data = {};
      data.id = id;
      data.qty = qty;

      await axios.post("http://localhost:5000/add-baseQty", data);
      setQty();

      alert(`${qty} quantities of ${name} has been added.`);
    } else {
      alert(`Add more quantities to update the stock.`);
    }
  };

  useEffect(() => {
    const productList = async () => {
      try {
        const obj = await fetch("http://localhost:5000/admin-base", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("admin-token"),
          },
          credentials: "include",
        });

        const data = await obj.json();
        setProduct(data.base);
        setNav(data.admin.type);

        if (obj.status !== 200) {
          const error = new Error(obj.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    };

    productList();
  }, [setLoading, setNav]);
  return (
    <section className="orders">
      <h3>Base Stock</h3>
      {loading ? (
        <GridLoader />
      ) : (
        <div className="orders-table">
          {product.length < 1 ? (
            <p>Stock is empty.</p>
          ) : (
            <table className="stock-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Image Src</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {product.map((list) => {
                  return (
                    <tr key={list._id}>
                      <td>{++count}</td>
                      <td>{list.name}</td>
                      <td>{list.src}</td>
                      <td>{list.price}</td>
                      <td>
                        <input
                          type="number"
                          onChange={(e) => setQty(e.target.value)}
                          defaultValue={list.quantity}
                        />
                        <button
                          onClick={() =>
                            Increase(list._id, list.name, list.quantity)
                          }
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}

export default AdminBase;
