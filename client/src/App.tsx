import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./chat";
import Home from "./Components/Home/home";
import LogIn from "./Components/Login/login";
import UserAccount from "./Components/UserAccount/useraccount";
import ProtectedRoutes from "./protectedroutes";

function App() {
  return <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/login" element={<LogIn/>}  />
         
         <Route element={<ProtectedRoutes/>}   >
         <Route path="/user/:username" element={<UserAccount/>}  />
         </Route>

         <Route element={<ProtectedRoutes/>}   >
         <Route path="/" element={<UserAccount/>}  />
         </Route>

       
      </Routes>

    </Router>

  </div>;
}

export default App;
