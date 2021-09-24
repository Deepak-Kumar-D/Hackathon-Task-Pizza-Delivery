import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoBack } from "./GoBack.js";
import "../css/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { showLoad } from "../App";

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

export function CreateAdmin() {
  const { loading, setLoading } = useContext(showLoad);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const obj = await fetch(
      "https://pizza-town-db.herokuapp.com/admin-register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          password: data.password,
        }),
      }
    );

    if (obj.status !== 422) {
      toast.success(
        "Verification email sent!\nPlease check your email to verify!",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      setLoading(false);

      setInterval(() => {
        history.push("/admin-login");
      }, 3100);
    } else {
      setLoading(false);
      toast.error("Email-id already exist!", {
        position: "top-right",
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <section className="load login">
      {loading ? (
        <GridLoader />
      ) : (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <GoBack />
          <h3>New Admin</h3>

          <hr />

          <div className="loginForm">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              {...register("name", {
                required: "⚠ We would love to know your name!",
              })}
            />
            <p className="message">{errors.name && errors.name.message}</p>

            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              {...register("email", {
                required: "⚠ Email is required!",
              })}
            />
            <p className="message">{errors.email && errors.email.message}</p>

            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              name="phone"
              placeholder="Contact number"
              {...register("phone", {
                required: "⚠ Oops! Contact number is also required!",
              })}
            />
            <p className="message">{errors.phone && errors.phone.message}</p>

            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              {...register("address", {
                required: "⚠ We need your address to deliver!",
              })}
            />
            <p className="message">
              {errors.address && errors.address.message}
            </p>

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

            <input type="submit" value="Register" />
          </div>
        </form>
      )}

      <ToastContainer />
    </section>
  );
}
