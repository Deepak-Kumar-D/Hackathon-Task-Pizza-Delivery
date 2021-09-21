import "../css/UserDashboard.css";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState, useContext, createContext } from "react";
import { CartPanel } from "./CartPanel.js";
import { useHistory } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { showLoad } from "../App";
import ImageCarousel from "./ImageCarousel";

export const orderCheckout = createContext(null);

export function UserDashboard() {
  const { loading, setLoading, setNav } = useContext(showLoad);
  const [cartData, setCartData] = useState([]);
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [show, setShow] = useState("none");
  const [user, setUser] = useState([]);
  const [check, setCheck] = useState(false);
  const history = useHistory();

  const Cart = async () => {
    setLoading(true);
    const obj = await fetch("http://localhost:5000/get-cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      credentials: "include",
    });

    const data = await obj.json();

    if (data.total_quantity === 0) {
      setCheck(true);
    } else {
      setItem(data.items);
      setTotal(data.total_price);
      setQty(data.total_quantity);
      setCheck(true);
    }

    setLoading(false);
  };

  const Add = async (data) => {
    const quantity = prompt("Set the required quanity:");
    const newItem = {};
    newItem.productId = data._id;
    newItem.name = data.name;
    newItem.price = data.price;
    if (quantity === "") {
      newItem.quantity = 1;
    } else {
      newItem.quantity = quantity;
    }

    const items = [...item];
    items.push(newItem);
    setItem(items);

    alert(`${data.name} added to the cart!`);
  };

  // Addition function to find the total price
  useEffect(() => {
    const sum = () => {
      let addition = 0;
      for (let i = 0; i < item.length; i++) {
        addition += item[i].price;
      }

      setTotal(addition);
      setQty(item.length);
    };
    sum();
  }, [item, qty]);

  useEffect(() => {
    if (!check) {
      Cart();
    }
  });

  useEffect(() => {
    const addCart = async () => {
      await fetch("http://localhost:5000/add-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          items: item,
          total: total,
          qty: qty,
        }),
      });
    };

    addCart();
  }, [user, item, qty, total]);

  useEffect(() => {
    const dashboard = async () => {
      setLoading(true);
      try {
        const obj = await fetch("http://localhost:5000/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          credentials: "include",
        });

        const data = await obj.json();

        setUser(data);
        setNav(data.type);

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

    const Products = async () => {
      setLoading(true);
      try {
        const obj = await fetch("http://localhost:5000/user-products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          credentials: "include",
        });

        const data = await obj.json();
        setCartData(data.products);

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

    dashboard();
    Products();
  }, [setLoading, setNav, history]);

  return (
    <orderCheckout.Provider
      value={{
        show,
        setShow,
        item,
        setItem,
        total,
        setTotal,
        qty,
        setQty,
        user,
        Cart,
      }}
    >
      <div className="dashboard">
        <ImageCarousel />
        <div className="mid-align select">
          <h1>Select your me time Pizza!</h1>
        </div>

        {/* Dashboard */}
        <section className="user">
          {loading ? (
            <GridLoader />
          ) : (
            <div className="userDash">
              {cartData.map((data) => {
                return (
                  <div
                    className="mid-align imageBg"
                    key={data._id}
                    onClick={() => Add(data)}
                  >
                    <div className="priceTag">
                      <span>₹ {data.price}</span>
                    </div>

                    {/* Image grid of the recipes on the Main Page */}
                    <div className="mid-align image">
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
        <CartPanel />
      </div>
    </orderCheckout.Provider>
  );
}
