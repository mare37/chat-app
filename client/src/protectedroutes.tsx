import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function ProtectedRoutes() {
  const [isAuth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/logInStatus")
      .then((response) => {
        setAuth(response.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isAuth]);

  if (isAuth === null) {
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
