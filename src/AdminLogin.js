import { GoBack } from "./GoBack.js";
import { Link } from "react-router-dom";

export function AdminLogin() {
  return (
    <section className="login">
      <form method="GET">
        <GoBack />
        <h2>Admin Login</h2>

        <hr style={{ borderColor: "#abac7f" }} />

        <div className="loginForm">
          <label>E-mail Id</label>
          <input />
          <br />

          <label>Password</label>
          <input />
          <br />

          <input type="submit" value="Submit" />
          <br />
        </div>
        <Link to="/createuser">
          <p>
            Don't have an account? <b>SignUp!</b>
          </p>
        </Link>
      </form>
    </section>
  );
}
