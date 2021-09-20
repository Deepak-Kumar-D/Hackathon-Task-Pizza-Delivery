import { Link } from "react-router-dom";
import "../css/ChooseLogin.css";

export function ChooseLogin() {
  return (
    <section className="login">
      <div className="mid-align credentials">
        <p>Are you a User or an Admin?</p>
        <Link to="/login">
          <button className="btn">User Login</button>
        </Link>

        <Link to="/admin-login">
          <button className="btn">Admin Login</button>
        </Link>
      </div>
    </section>
  );
}
