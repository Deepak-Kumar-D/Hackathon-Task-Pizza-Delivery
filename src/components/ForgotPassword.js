import { useForm } from "react-hook-form";
import { GoBack } from "./GoBack.js";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../css/Login.css";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function ForgotPassword() {
  const history = useHistory();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    if (obj.status !== 422) {
      alert("Please check your Email to reset the password.");
      reset();
      history.push("/");
    } else {
      alert("Invalid Email-Id");
    }
  };

  return (
    <section className="load login">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <GoBack />
        <h3>Forgot Password</h3>

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

          <input type="submit" value="Submit" />
        </div>
      </form>
    </section>
  );
}
