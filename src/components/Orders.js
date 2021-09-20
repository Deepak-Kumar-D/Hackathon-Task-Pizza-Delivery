import React, { useEffect, useContext, useState } from "react";
import { showLoad } from "../App";
import { GridLoader } from "react-spinners";
import "../css/AdminDashboard.css";
import "../css/Orders.css";

function Orders() {
  const { loading, setLoading, setNav } = useContext(showLoad);
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState();
  let count = 0;

  useEffect(() => {
    const Orders = async () => {
      const obj = await fetch("http://localhost:5000/user-orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        credentials: "include",
      });

      const data = await obj.json();

      setOrder(data.orders);
      setAddress(data.address);
      setNav(data.type);
    };

    setInterval(() => {
      Orders();
    }, 1000);
  }, [setLoading, setNav]);
  return (
    <section className="orders">
      <h3>Orders</h3>
      {loading ? (
        <GridLoader />
      ) : (
        <div className="orders-table">
          {order.length < 1 ? (
            <p>No orders placed.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Order Id</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Address</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {order.map((list) => {
                  return (
                    <tr key={list._id}>
                      <td>{++count}</td>
                      <td>{list._id}</td>
                      <td>
                        {list.items.map((item, index) => {
                          return list.items.length !== index + 1
                            ? item.name + ", "
                            : item.name;
                        })}
                      </td>
                      <td>{list.total_quantity}</td>
                      <td>{address}</td>
                      <td>{list.payment}</td>
                      <td className={list.status}>{list.status}</td>
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

export default Orders;