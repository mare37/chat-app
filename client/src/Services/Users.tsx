import axios from "axios";
import * as React from "react";
axios.defaults.withCredentials = true;



const Login = async (email: any, password: any) => {
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      email: email,
      password: password,
    });
    console.log(response.data);

    if (response.data.auth) {
      console.log("you are in");
      const user = {
        auth: true,
        user: {
          username: response.data.user_name,
          userid: response.data.user_id,
        },
      };

      return user;
    } else {
      console.log("you are out");
      const user = {
        auth: false,
        user: {
          username: "",
          userid: "",
        },
      };
      return user;
    }
  } catch (err) {
    console.log(err);
  }
  
};



const getLoginStatus = async () => {
  const response = await axios.get("http://localhost:5000/api/logInStatus");  

  try {
    console.log(response.data.login);
    console.log(response.data);

    if (response.data.login) {
      console.log("you are in");

      const auth = { isLoggedIn: true };
      return auth;
    } else {
      const auth = { isLoggedIn: false };
      return auth;
    }
  } catch (err) {
    console.log(err);
  }
};



export { Login, getLoginStatus};
