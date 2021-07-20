import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { showLoad } from "../App";

export const Logout = () => {
  const { loading, setLoading } = useContext(showLoad);
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      setLoading(true);
      try {
        const obj = await fetch("https://pizza-town-db.herokuapp.com/logout", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        history.push("https://pizza-town-db.herokuapp.com/login", {
          replace: true,
        });

        if (obj.status !== 200) {
          const error = new Error(obj.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    logout();
    setLoading();
  }, [history, setLoading]);

  return <> {loading ? <GridLoader /> : "Logout"}</>;
};
