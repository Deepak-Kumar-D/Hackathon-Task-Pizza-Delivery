import { useForm } from "react-hook-form";
import { GoBack } from "./GoBack.js";
import { useHistory, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../css/Login.css";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(3, "⚠ Minimum 3 characters!")
    .max(15, "⚠ Maximum 15 characters!")
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

export default function ResetPassword() {
  const { token } = useParams();
  const history = useHistory();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch(`http://localhost:5000/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: data.password,
      }),
    });

    if (obj.status !== 422) {
      alert(
        "Password reset successful.\nPress 'Okay' to login with new password."
      );
      reset();
      history.push("/");
    } else {
      alert("Invalid attempt!");
    }
  };

  return (
    <section className="load login">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <GoBack />
        <h3>Reset Password</h3>

        <hr />

        <div className="loginForm">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Please type a strong password"
            {...register("password")}
          />
          <p className="message">{errors.password?.message}</p>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Please confirm the password"
            {...register("confirmPassword")}
          />
          <p className="message">
            {errors.confirmPassword && "⚠ Oops! Passwords should match!"}
          </p>

          <input type="submit" value="Reset" />
        </div>
      </form>
    </section>
  );
}
