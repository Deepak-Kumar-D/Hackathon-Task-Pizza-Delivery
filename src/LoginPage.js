import { useForm } from "react-hook-form";
import { GoBack } from "./GoBack.js";
import { Link, Redirect } from "react-router-dom";

import { useState } from "react";

export function LoginPage() {
  const [userdashboard, setUserdashboard] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const el = await fetch("https://pizza-town-db.herokuapp.com/users", {
      method: "GET",
    });
    const conv = await el.json();
    console.log(conv);

    if (conv) {
      setUserdashboard(true);
    }

    console.log(errors);
  };

  return (
    <section className="login">
      <form method="GET" onSubmit={handleSubmit(onSubmit)}>
        <GoBack />
        <h2>Login</h2>

        <hr style={{ borderColor: "#abac7f" }} />

        <div className="loginForm">
          <label>E-mail Id</label>
          <input name="email" placeholder="E-mail Id" {...register("email")} />
          <br />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password")}
          />
          <br />

          <input type="submit" value="Submit" />
          <br />

          {userdashboard ? <Redirect to="/dashboard" /> : ""}
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
