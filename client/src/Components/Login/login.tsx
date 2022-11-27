import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


axios.defaults.withCredentials = true;

function LogIn() {


  


  
  



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();


  useEffect(()=>{
    console.log("effect login");
    

    axios.get("http://localhost:5000/api/logInStatus").then((response)=>{
          console.log(response.data.login);
          console.log(response.data);
          
          if (response.data.login) {
            console.log("you are in");
          
            
            
           navigate(`/user/wilson`)
          }
    }).catch((err)=>{
        console.log(err);
        
    })

},[])








  const submitLoginDetails = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
      

      if (response.data.auth) {
        console.log("you are in");
      

       navigate(`/user/${response.data.user_name}`)
      } else {
        console.log("you are out");
      }
    } catch (err) {
      console.log(err);
    }

    //console.log(response.data);
  };

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
