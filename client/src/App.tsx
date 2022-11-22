import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./chat";
import Home from "./Components/Home/home";
import LogIn from "./Components/Login/login";

function App() {
  return <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/login" element={<LogIn/>}  />
      </Routes>

    </Router>

  </div>;
}

export default App;
