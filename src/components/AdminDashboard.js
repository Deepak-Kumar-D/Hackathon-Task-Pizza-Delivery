import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { showLoad } from "../App";
import { GridLoader } from "react-spinners";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  const { loading, setLoading, setNav } = useContext(showLoad);
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  let count = 0;
  let [pendingOrder, setPendingOrder] = useState(0);

  useEffect(() => {
    const adminDashboard = async () => {
      setLoading(true);
      try {
        const obj = await fetch("http://localhost:5000/admin-dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("admin-token"),
          },
          credentials: "include",
        });

        const data = await obj.json();

        setNav(data.type);

        if (obj.status !== 200) {
          const error = new Error(obj.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        history.push("/admin-login");
      }
      setLoading(false);
    };

    adminDashboard();
  }, [setLoading, setNav, history]);

  const orderList = async () => {
    try {
      const obj = await fetch("http://localhost:5000/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("admin-token"),
        },
        credentials: "include",
      });

      const data = await obj.json();
      setOrders(data.orders);

      data.orders.forEach((ele) => {
        if (ele.status !== "Order Delivered") {
          setPendingOrder(++pendingOrder);
        }
      });

      if (obj.status !== 200) {
        const error = new Error(obj.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    orderList();
  });

  const showStatus = async (e, userId, listId, orderId) => {
    let status = e.target.value;

    await fetch("http://localhost:5000/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        status: status,
        listId: listId,
        orderId: orderId,
      }),
    });

    orderList();

    alert(
      `Status updated to ${status.toUpperCase()} for the user-id ${userId}`
    );
  };
  return (
    <section className="orders">
      <h3>Pending Orders</h3>
      {loading ? (
        <GridLoader />
      ) : (
        <div className="orders-table">
          {pendingOrder === 0 ? (
            <p>No orders placed.</p>
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
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((list) => {
                  return list.status !== "Order Delivered" ? (
                    <tr key={list._id}>
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
                      <td className={list.status}>
                        <select
                          className={list.status}
                          defaultValue={list.status}
                          onChange={(e) =>
                            showStatus(
                              e,
                              list.user,
                              list.order.orderId,
                              list._id
                            )
                          }
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Order Accpeted">Order Accpeted</option>
                          <option value="Order is being prepared">
                            Order is being prepared
                          </option>
                          <option value="On the way">On the way</option>
                          <option value="Order Delivered">
                            Order Delivered
                          </option>
                        </select>
                      </td>
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

export default AdminDashboard;
