import { useState, useEffect } from "react";
import { useLoginUser , useGetLoginStatus } from "../../Hooks/Users";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { submitLoginDetails} = useLoginUser (email, password);
  const {  getLogin } = useGetLoginStatus()




  //Determine if user is logged in,any time this page reloads
  useEffect(() => {
    getLogin();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(./images/computer3.jpg)`,
        backgroundSize: "cover",
        position: "relative",
        zIndex: 1,
      }}
      id="login"
    >
      <form onSubmit={submitLoginDetails} className="login-container">
        <p>Login</p>

        <input
          placeholder="Enter Email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />

        <br />

        <button type="submit">Submit</button>

        <div className="login-forgotpassword">Forgot Password</div>
      </form>
    </div>
  );
}

export default LogIn;
