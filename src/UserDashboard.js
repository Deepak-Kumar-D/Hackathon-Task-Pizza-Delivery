import { CartData } from "./CartData.js";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { CartPanel } from "./CartPanel.js";

export function UserDashboard() {
  const [item, setItem] = useState([]);

  const [show, setShow] = useState("none");

  const Add = (data) => {
    const items = [...item];
    items.push(data);
    setItem(items);
  };

  return (
    <div>
      <section className="user">
        <div className="userDash">
          {CartData.map((data) => {
            return (
              <div className="imageBg" key={data.id} onClick={() => Add(data)}>
                <div className="priceTag">
                  <span>₹ {data.price}</span>
                </div>
                {/* Image grid of the recipes on the Main Page */}
                <div className="image">
                  <img src={data.src} alt="" />
                </div>

                {/* Recipe name under Image on the Main Page */}
                <div>
                  <p>{data.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cart Button */}
      <div className="btnCart" onClick={() => setShow("block")}>
        <span>{item.length}</span>
        <button style={{ pointerEvents: item.length > 0 ? "auto" : "none" }}>
          <FaShoppingCart />
        </button>
      </div>

      {/* Panel for cart */}
      <CartPanel setItem={setItem} show={show} setShow={setShow} item={item} />
    </div>
  );
}
