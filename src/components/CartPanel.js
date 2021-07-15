import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export function CartPanel({ show, setShow, item, setItem }) {
  const [total, setTotal] = useState(0);

  // Removing an item from the cart and refreshing it at the same time.
  const removeItem = (index) => {
    item.splice(index, 1);

    const updatedItems = item.filter((elem) => {
      return elem;
    });

    if (item.length === 0) {
      setShow("none");
    } else {
      setItem(updatedItems);
    }
  };

  // Addition function to find the total price
  useEffect(() => {
    const sum = () => {
      let addition = 0;
      for (let i = 0; i < item.length; i++) {
        addition += item[i].price;
      }

      setTotal(addition);
    };
    sum();
  }, [item]);

  return (
    // Cart panel which is displayed on click of the cart button if there are items in it.
    <Card>
      <div className="cartPanel" style={{ display: show }}>
        <div className="checkout">
          <div>
            <h2>Basket</h2>
            <button className="closebtn" onClick={() => setShow("none")}>
              X
            </button>
          </div>
          <hr style={{ width: "100%" }} />

          <div style={{ width: "100%" }}>
            {item.map((cartItems, index) => {
              return (
                <div key={index}>
                  <div className="row">
                    <div className="cartRow">
                      <h6>{cartItems.name}</h6>
                    </div>

                    <div className="cartRow">
                      <p>${cartItems.price}</p>
                    </div>

                    <div className="cartRow">
                      <button
                        className="btnRemove"
                        onClick={() => removeItem(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>

          {/* Total price of the cart */}
          <div className="totalPrice">
            <h3>${item.length === 0 ? 0 : total}</h3>
          </div>

          <hr style={{ width: "100%" }} />

          {/* Checkout button */}
          <div>
            <button className="btn">Checkout</button>
          </div>
        </div>
      </div>
    </Card>
  );
}
