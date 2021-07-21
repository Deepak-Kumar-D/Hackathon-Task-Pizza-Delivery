import { Link } from "react-router-dom";

export function ChooseLogin() {
  return (
    <section className="mid-align main">
      <div className="mid-align credentials">
        <p>Are you a User or an Admin?</p>
        <Link to="/login">
          <button className="btn">User Login</button>
        </Link>

        <Link to="/adminlogin">
          <button className="btn">Admin Login</button>
        </Link>
      </div>
    </section>
  );
}
