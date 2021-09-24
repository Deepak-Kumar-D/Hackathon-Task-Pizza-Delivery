import "./css/style.css";
import { Switch, Route } from "react-router-dom";
import { ChooseLogin } from "./components/ChooseLogin.js";
import { Header } from "./components/Header.js";
import { LoginPage } from "./components/LoginPage.js";
import { AdminLogin } from "./components/AdminLogin.js";
import { CreateUser } from "./components/CreateUser.js";
import { CreateAdmin } from "./components/CreateAdmin.js";
import { Footer } from "./components/Footer";
import { UserDashboard } from "./components/UserDashboard.js";
import AdminDashboard from "./components/AdminDashboard.js";
import { Logout } from "./components/Logout.js";
import { AdminLogout } from "./components/AdminLogout.js";
import { createContext, useState } from "react";
import Verify from "./components/Verify";
import AdminVerify from "./components/AdminVerify";
import AdminProducts from "./components/AdminProducts";
import AdminOrders from "./components/AdminOrders";
import Orders from "./components/Orders";
import ForgotPassword from "./components/ForgotPassword.js";
import ResetPassword from "./components/ResetPassword";
import AdminBase from "./components/AdminBase";
import AdminSauce from "./components/AdminSauce";
import AdminCheese from "./components/AdminCheese";
import AdminVeggies from "./components/AdminVeggies";
import AdminMeat from "./components/AdminMeat";

// https://pizza-town-db.herokuapp.com/

export const showLoad = createContext(null);

function App() {
  const [loading, setLoading] = useState(false);
  const [nav, setNav] = useState("none");
  return (
    <div className="app">
      <Header nav={nav} />

      <img className="imgBG" src="images/Vector_BG.png" alt="" />

      <showLoad.Provider value={{ loading, setLoading, setNav, nav }}>
        <Switch>
          {/* Choose Login Page for admin or user */}
          <Route exact path="/">
            <ChooseLogin />
          </Route>

          {/* Login Page */}
          <Route path="/login">
            <LoginPage />
          </Route>

          {/* Create User Page */}
          <Route path="/createuser">
            <CreateUser />
          </Route>

          {/* Verify User Page */}
          <Route path="/verify/:token">
            <Verify />
          </Route>

          {/* User Dashboard */}
          <Route path="/dashboard">
            <UserDashboard />
          </Route>

          {/* User Orders */}
          <Route path="/orders">
            <Orders />
          </Route>

          {/* User Logout */}
          <Route path="/logout">
            <Logout />
          </Route>

          {/* Admin Login Page */}
          <Route path="/admin-login">
            <AdminLogin />
          </Route>

          {/* Create Admin Page */}
          <Route path="/create-admin">
            <CreateAdmin />
          </Route>

          {/* Verify Admin Page */}
          <Route path="/admin-verify/:token">
            <AdminVerify />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin-dashboard">
            <AdminDashboard />
          </Route>

          {/* Admin Orders */}
          <Route path="/admin-orders">
            <AdminOrders />
          </Route>

          {/* Admin Products */}
          <Route path="/admin-products">
            <AdminProducts />
          </Route>

          {/* Admin Base */}
          <Route path="/admin-base">
            <AdminBase />
          </Route>

          {/* Admin Sauce */}
          <Route path="/admin-sauce">
            <AdminSauce />
          </Route>

          {/* Admin Cheese */}
          <Route path="/admin-cheese">
            <AdminCheese />
          </Route>

          {/* Admin Veggies */}
          <Route path="/admin-veggies">
            <AdminVeggies />
          </Route>

          {/* Admin Meat */}
          <Route path="/admin-meat">
            <AdminMeat />
          </Route>

          {/* Admin Logout */}
          <Route path="/admin-logout">
            <AdminLogout />
          </Route>

          {/* Reset Password */}
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>

          {/* Reset Password */}
          <Route path="/reset-password/:token">
            <ResetPassword />
          </Route>
        </Switch>
      </showLoad.Provider>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

// Hex Codes: #373d20, #717744, #abac7f, #fefefe, #080808
