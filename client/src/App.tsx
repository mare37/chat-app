import * as React from 'react'
import {FC} from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home/home";
import LogIn from "./Components/Login/login";

import UserAccount from "./Components/UserAccount/useraccount";
import Admin from "./Components/Admin/admin";
import ProtectedRoutes from "./protectedroutes";

import {SocketContext, socket} from "./context";





function App  () {
  return <div>

    <SocketContext.Provider  value={socket} >
    <Router>
      <Routes>
       
        
      <Route path="/login" element={<LogIn/>}  />
         <Route element={<ProtectedRoutes/>}   >
         <Route path="/user/:username" element={<UserAccount/>}  />
         </Route>
         <Route path="/" element={<Home/>}  />
         <Route path="/admin" element={<Admin/>}  />

       
      </Routes>

    </Router>

    </SocketContext.Provider>
    
    

   

  </div>;
}

export default App;
