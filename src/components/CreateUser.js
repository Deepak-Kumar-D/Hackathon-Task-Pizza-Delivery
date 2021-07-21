import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoBack } from "./GoBack.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().positive().integer().required(),
  address: yup.string().required(),
  password: yup
    .string()
    .min(2, "⚠ Minimum 10 characters!")
    .max(15, "⚠ Maximum 10 characters!")
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

export function CreateUser() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch("https://pizza-town-db.herokuapp.com/register", {
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
    });

    const reg = await obj.json();

    if (reg) {
      toast.success("Registration Successul! Please Login Now!", {
        position: "top-right",
        autoClose: 3000,
      });

      setInterval(() => {
        history.push("/login");
      }, 3100);
    }
  };

  return (
    <section className="mid-align createForm">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <GoBack />
        <h2>New User</h2>

        <hr />

        <div className="loginForm">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            {...register("name")}
          />
          <p className="message">
            {errors.name && "⚠ We would love to know your name!"}
          </p>
          <br />

          <label htmlFor="email">E-mail Id</label>
          <input
            type="text"
            name="email"
            placeholder="E-mail Id"
            {...register("email")}
          />
          <p className="message">{errors.email && "⚠ Email is required!"}</p>
          <br />

          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="phone"
            placeholder="Contact number"
            {...register("phone")}
          />
          <p className="message">
            {errors.phone && "⚠ Oops! Contact number is also required!"}
          </p>
          <br />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            {...register("address")}
          />
          <p className="message">
            {errors.address && "⚠ We need your address to deliver!"}
          </p>
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Please type a strong password"
            {...register("password")}
          />
          <p className="message">{errors.password?.message}</p>
          <br />

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
          <br />

          <input type="submit" value="Submit" />
        </div>
      </form>

      <ToastContainer />
    </section>
  );
}
