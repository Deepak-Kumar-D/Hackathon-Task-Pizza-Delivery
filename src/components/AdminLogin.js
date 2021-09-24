import { useForm } from "react-hook-form";
import { useContext } from "react";
import { GoBack } from "./GoBack.js";
import { Link, useHistory } from "react-router-dom";
import "../css/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GridLoader } from "react-spinners";
import { showLoad } from "../App";

export function AdminLogin() {
  const { loading, setLoading } = useContext(showLoad);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const obj = await fetch("https://pizza-town-db.herokuapp.com/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      mode: "cors",
      credentials: "include",
    });

    const login = await obj.json();

    if (obj.status === 400) {
      setLoading(false);
      toast.error("Invalid Credentials!", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      localStorage.setItem("admin-token", login.admin);
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        history.push("/admin-dashboard");
        setLoading(false);
      }, 1100);
    }
  };

  return (
    <section className="load login">
      {loading ? (
        <GridLoader />
      ) : (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <GoBack />
          <h3>Admin Login</h3>

          <hr />

          <div className="loginForm">
            <label htmlFor="email">E-mail Id</label>
            <input
              type="text"
              name="email"
              placeholder="E-mail Id"
              {...register("email", { required: "⚠ Email is required!" })}
            />
            <p className="message">{errors.email && errors.email.message}</p>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", { required: "⚠ Password is required!" })}
            />
            <p className="message">
              {errors.password && errors.password.message}
            </p>

            <input type="submit" value="Login" />
            <br />
            <Link to="/create-admin">
              <p>
                Don't have an account? <b>SignUp!</b>
              </p>
            </Link>
            <br />
            <Link to="/forgot-password">
              <p>Forgot Password?</p>
            </Link>
          </div>
        </form>
      )}
      <ToastContainer />
    </section>
  );
}
