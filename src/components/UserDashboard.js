import { CartData } from "./CartData.js";
import { FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { CartPanel } from "./CartPanel.js";
import { useHistory, Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { showLoad } from "../App";
import { useContext } from "react";

export function UserDashboard() {
  const { loading, setLoading } = useContext(showLoad);
  const [item, setItem] = useState([]);
  const [show, setShow] = useState("none");
  const history = useHistory();

  const Add = (data) => {
    const items = [...item];
    items.push(data);
    setItem(items);
  };

  useEffect(() => {
    const Dash = async () => {
      setLoading(true);
      try {
        const obj = await fetch("/dashboard", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (obj.status !== 200) {
          const error = new Error(obj.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        history.push("/login");
      }
      setLoading(false);
    };
    Dash();
    setLoading();
  }, [history, setLoading]);

  return (
    <div className="dashboard">
      {/* Logout Button */}
      <Link to="/logout">
        <RiLogoutBoxFill className="ham" />
      </Link>

      <div className="select">
        <h1>Select your me time Pizza!</h1>
      </div>

      {/* Dashboard */}
      <section className="user">
        {loading ? (
          <GridLoader />
        ) : (
          <div className="userDash">
            {CartData.map((data) => {
              return (
                <div
                  className="imageBg"
                  key={data.id}
                  onClick={() => Add(data)}
                >
                  <div className="priceTag">
                    <span>₹ {data.price}</span>
                  </div>
                  {/* Image grid of the recipes on the Main Page */}
                  <div className="image">
                    <h2>ADD to CART</h2>
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
        )}
      </section>

      {/* Cart Button */}
      <div
        className="btnCart"
        style={{ pointerEvents: item.length > 0 ? "auto" : "none" }}
        onClick={() => {
          item.length > 0 ? setShow("block") : setShow("none");
        }}
      >
        <span>{item.length}</span>
        <button>
          <FaShoppingCart />
        </button>
      </div>

      {/* Panel for cart */}
      <CartPanel setItem={setItem} show={show} setShow={setShow} item={item} />
    </div>
  );
}
