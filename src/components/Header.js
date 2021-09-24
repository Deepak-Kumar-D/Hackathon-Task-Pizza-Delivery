import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import "../css/Header.css";
import { useState } from "react";

export function Header({ nav }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="navbar">
      <div className="title">
        <h1>PIZZA</h1>
        <div className="mid-align logo">
          <img src="favicon.ico" alt="logo" />
        </div>
        <h1>TOWN</h1>
      </div>

      {nav === "user" ? (
        <ul className={menu ? "open" : "close"} onClick={() => setMenu(!menu)}>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      ) : nav === "admin" ? (
        <ul className={menu ? "open" : "close"} onClick={() => setMenu(!menu)}>
          <li>
            <Link to="/admin-dashboard">Pending Orders</Link>
          </li>
          <li>
            <Link to="/admin-orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin-products">Products</Link>
          </li>
          <li>
            <Link to="/admin-base">Base</Link>
          </li>
          <li>
            <Link to="/admin-sauce">Sauce</Link>
          </li>
          <li>
            <Link to="/admin-cheese">Cheese</Link>
          </li>
          <li>
            <Link to="/admin-veggies">Veggies</Link>
          </li>
          <li>
            <Link to="/admin-meat">Meat</Link>
          </li>
          <li>
            <Link to="/admin-logout">Logout</Link>
          </li>
        </ul>
      ) : (
        ""
      )}

      <div className="menu" onClick={() => setMenu(!menu)}>
        <MenuIcon />
      </div>
    </div>
  );
}
