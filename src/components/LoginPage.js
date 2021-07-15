import { useForm } from "react-hook-form";
import { useContext } from "react";
import { GoBack } from "./GoBack.js";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GridLoader } from "react-spinners";
import { showLoad } from "../App";

export function LoginPage() {
  const { loading, setLoading } = useContext(showLoad);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const obj = await fetch("/login", {
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

    if (obj.status === 400 || !login) {
      setLoading(false);
      toast.error("Invalid Credentials!", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        history.push("/dashboard");
        setLoading(false);
      }, 2100);
    }
  };

  return (
    <section className="login">
      {loading ? (
        <GridLoader />
      ) : (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <GoBack />
          <h2>Login</h2>

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

            <input type="submit" value="Submit" />
            <Link to="/createuser">
              <p>
                Don't have an account? <b>SignUp!</b>
              </p>
            </Link>
          </div>
        </form>
      )}
      <ToastContainer />
    </section>
  );
}
