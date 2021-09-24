// import axios from "axios";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";

function AdminVerify() {
  const { token } = useParams();
  const history = useHistory();

  const Verification = async () => {
    const obj = await fetch(
      `https://pizza-town-db.herokuapp.com/admin-verify/${token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (obj.status === 200) {
      alert("Your account has been verified!\nPlease Login.");
      history.push("/admin-login");
    }
  };

  useEffect(() => {
    Verification();
  });
  return <div className="mid-align main"></div>;
}

export default AdminVerify;
