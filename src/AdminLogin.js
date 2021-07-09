import { useForm } from "react-hook-form";
import { GoBack } from "./GoBack.js";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AdminLogin() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const obj = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const login = await obj.json();

    if (obj.status === 400) {
      toast.warning("Invalid Credentials!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      history.push("/dashboard");
    }
  };

  return (
    <section className="login">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <GoBack />
        <h2>Admin Login</h2>

        <hr style={{ borderColor: "#abac7f" }} />

        <div className="loginForm">
          <label htmlFor="email">E-mail Id</label>
          <input
            type="text"
            name="email"
            placeholder="E-mail Id"
            {...register("email", { required: "Email is required!" })}
          />
          <p className="message">{errors.email && errors.email.message}</p>
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: "Password is required!" })}
          />
          <p className="message">
            {errors.password && errors.password.message}
          </p>
          <br />

          <input type="submit" value="Submit" />
          <Link to="/createuser">
            <p>
              Don't have an account? <b>SignUp!</b>
            </p>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
}
