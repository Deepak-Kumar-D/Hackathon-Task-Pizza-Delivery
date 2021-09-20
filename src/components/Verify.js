import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";

function Verify() {
  const { token } = useParams();
  const history = useHistory();

  const Verification = async () => {
    const obj = await fetch(`http://localhost:5000/verify/${token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (obj.status === 200) {
      alert("Your account has been verified!\nPlease Login.");
      history.push("/login");
    }
  };

  useEffect(() => {
    Verification();
  });
  return <div className="mid-align main"></div>;
}

export default Verify;
