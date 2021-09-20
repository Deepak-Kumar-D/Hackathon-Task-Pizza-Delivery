import React, { useContext } from "react";
import axios from "axios";
import { orderCheckout } from "./UserDashboard";

function Checkout() {
  const { total, item, qty, user, setItem, setShow, setQty, setTotal } =
    useContext(orderCheckout);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const pay = { total: total };

    const result = await axios.post("http://localhost:5000/payment", pay);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_5ycjovH4vZhLVX",
      amount: amount.toString(),
      currency: currency,
      name: "Pizza Town",
      description: "Test Transaction",
      image: "/images/logo.png",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:5000/payment/success",
          data
        );

        alert(result.data.msg);

        if (result.data.paymentId) {
          const orderData = {
            userId: user._id,
            orderId: order_id,
            total_quantity: qty,
            total_price: total,
            items: item,
          };
          await axios.post("http://localhost:5000/add-order", orderData);
          await axios.post("http://localhost:5000/remove-quantity", orderData);

          setItem([]);
          setTotal(0);
          setQty(0);
          setShow("none");
        }
      },
      prefill: {
        name: "Pizza Town",
        email: "pizzatown@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#373D20",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <button className="btn" onClick={displayRazorpay}>
      Checkout
    </button>
  );
}

export default Checkout;
