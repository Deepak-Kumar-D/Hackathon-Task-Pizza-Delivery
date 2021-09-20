import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { showLoad } from "../App";

export const AdminLogout = () => {
  const { loading, setLoading, setNav } = useContext(showLoad);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    setNav("none");
    setTimeout(() => {
      localStorage.removeItem("admin-token");
      history.push("/");
    }, 1000);

    setLoading();
  }, [history, setLoading, setNav]);

  return (
    <div className="mid-align logout">{loading ? <GridLoader /> : ""}</div>
  );
};
