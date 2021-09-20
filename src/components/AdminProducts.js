import React, { useState, useEffect, useContext } from "react";
import { showLoad } from "../App";
import { GridLoader } from "react-spinners";
import "../css/AdminProducts.css";

function AdminProducts() {
  const { loading, setLoading, setNav } = useContext(showLoad);
  const [product, setProduct] = useState([]);
  let count = 0;

  useEffect(() => {
    const productList = async () => {
      try {
        const obj = await fetch("http://localhost:5000/products", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("admin-token"),
          },
          credentials: "include",
        });

        const data = await obj.json();
        setProduct(data.products);
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
      <h3>Stock</h3>
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
                        <button>-</button>
                        {list.quantity}
                        <button>+</button>
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

export default AdminProducts;
