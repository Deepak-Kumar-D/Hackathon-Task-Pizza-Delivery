import "./style.css";
import { Switch, Route } from "react-router-dom";
import { ChooseLogin } from "./components/ChooseLogin";
import { Header } from "./components/Header";
import { LoginPage } from "./components/LoginPage";
import { AdminLogin } from "./components/AdminLogin.js";
import { CreateUser } from "./components/CreateUser";
import { Footer } from "./components/Footer";
import { UserDashboard } from "./components/UserDashboard";
import { Logout } from "./components/Logout";
import { createContext, useState } from "react";

export const showLoad = createContext(null);

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <showLoad.Provider value={{ loading, setLoading }}>
      <div>
        <div>
          <Header />
        </div>

        <Switch>
          {/* HomePage */}
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

          {/* Admin Login Page */}
          <Route path="/adminlogin">
            <AdminLogin />
          </Route>

          {/* User Dashboard */}
          <UserDashboard path="/dashboard" />

          {/* User Logout */}
          <Route>
            <Logout path="/logout" />
          </Route>
        </Switch>

        {/* Footer */}
        <Footer />
      </div>
    </showLoad.Provider>
  );
}

export default App;

// Hex Codes: #373d20, #717744, #abac7f, #fefefe, #080808
