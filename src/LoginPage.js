import { useForm } from "react-hook-form";
import { GoBack } from "./GoBack.js";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LoginPage() {
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
      toast.error("Invalid Credentials!", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      setInterval(() => {
        history.push("/dashboard");
      }, 2100);
    }
  };

  return (
    <section className="login">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <GoBack />
        <h2>Login</h2>

        <hr style={{ borderColor: "#abac7f" }} />

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
      <ToastContainer />
    </section>
  );
}
