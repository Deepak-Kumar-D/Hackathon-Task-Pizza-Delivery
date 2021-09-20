import React, { useEffect, useContext, useState } from "react";
import { showLoad } from "../App";
import { GridLoader } from "react-spinners";
import "../css/AdminDashboard.css";

function AdminOrders() {
  const { loading, setLoading, setNav } = useContext(showLoad);
  const [orders, setOrders] = useState([]);
  let count = 0;

  useEffect(() => {
    const orderList = async () => {
      setLoading(true);
      try {
        const obj = await fetch("http://localhost:5000/orders", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-access-token": localStorage.getItem("admin-token"),
          },
          credentials: "include",
        });

        const data = await obj.json();

        setOrders(data.orders);
        setNav(data.user.type);

        if (obj.status !== 200) {
          const error = new Error(obj.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    };
    orderList();
    setLoading();
  }, [setLoading, setNav]);
  return (
    <section className="orders">
      <h3>Orders</h3>
      {loading ? (
        <GridLoader />
      ) : (
        <div className="orders-table">
          {orders < 1 ? (
            <p>No orders delivered.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Order Id</th>
                  <th>User Id</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Address</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((list) => {
                  return list.status === "Order Delivered" ? (
                    <tr key={list._id} className="Order Delivered">
                      <td>{++count}</td>
                      <td>{list.order.orderId}</td>
                      <td>{list.user}</td>
                      <td>
                        {list.order.items.map((item, index) => {
                          return list.order.items.length !== index + 1
                            ? item.name + ", "
                            : item.name;
                        })}
                      </td>
                      <td>{list.order.total_quantity}</td>
                      <td>{list.address}</td>
                      <td>{list.payment}</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}

export default AdminOrders;
