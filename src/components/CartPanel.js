import "../css/CartPanel.css";
import { Card } from "react-bootstrap";
import Checkout from "./Checkout";
import { FaShoppingBasket } from "react-icons/fa";
import { IoBagRemoveSharp } from "react-icons/io5";
import { orderCheckout } from "./UserDashboard";
import { useContext } from "react";

export function CartPanel() {
  const { show, setShow, item, setItem, total } = useContext(orderCheckout);

  // Removing an item from the cart and refreshing it at the same time.
  const removeItem = (index) => {
    item.splice(index, 1);

    const updatedItems = item.filter((elem) => {
      return elem;
    });

    if (item.length === 0) {
      setItem(updatedItems);
      setShow("none");
    } else {
      setItem(updatedItems);
    }
  };

  return (
    // Cart panel which is displayed on click of the cart button if there are items in it.
    <Card>
      <div className="cartPanel" style={{ display: show }}>
        <div className="checkout">
          <div className="header">
            <button className="closebtn" onClick={() => setShow("none")}>
              X
            </button>
            <h3>
              <FaShoppingBasket />
              BASKET
            </h3>
          </div>
          <hr style={{ width: "100%" }} />

          <div style={{ width: "100%" }}>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>

              {item.map((cartItems, index) => {
                return (
                  <tbody key={index} className="cartDetail">
                    <tr>
                      <td>
                        {cartItems.name}
                        <br />
                        <span>
                          {cartItems.extras.base}, {cartItems.extras.sauce},
                          {" " + cartItems.extras.cheese},
                          {" " +
                            cartItems.extras.veggies
                              .map((item) => item)
                              .join(", ")}
                          ,
                          {" " +
                            cartItems.extras.meat
                              .map((item) => item)
                              .join(", ")}
                          .
                        </span>
                      </td>
                      <td>₹{cartItems.price}</td>
                      <td>{cartItems.quantity}</td>
                      <td onClick={() => removeItem(index)}>
                        <IoBagRemoveSharp />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>

          {/* Total price of the cart */}
          <div className="totalPrice">
            <h3>
              Total:
              <span>₹{item.length === 0 ? 0 : total}</span>
            </h3>

            <hr style={{ width: "100%" }} />

            {/* Checkout button */}
            <Checkout />
          </div>
        </div>
      </div>
    </Card>
  );
}
