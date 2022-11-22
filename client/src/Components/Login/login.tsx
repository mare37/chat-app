function LogIn() {
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
      <form className="login-container">
        <p>Login</p>

        <input placeholder="Enter Email" />

        <input type="password" placeholder="Password" />

        <br />

        <button type="submit">Submit</button>

        <div className="login-forgotpassword">Forgot Password</div>
      </form>
    </div>
  );
}

export default LogIn;
