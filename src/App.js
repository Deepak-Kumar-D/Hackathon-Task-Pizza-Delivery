import "./style.css";
import { Switch, Route } from "react-router-dom";
import { ChooseLogin } from "./ChooseLogin.js";
import { Header } from "./Header.js";
import { LoginPage } from "./LoginPage.js";
import { AdminLogin } from "./AdminLogin.js";
import { CreateUser } from "./CreateUser.js";
import { Footer } from "./Footer.js";
import { UserDashboard } from "./UserDashboard.js";

function App() {
  return (
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

        {/* <Route>User Dash Board</Route> */}
        <UserDashboard path="/dashboard" />
      </Switch>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

// Hex Codes: #373d20, #717744, #abac7f, #fefefe, #080808
