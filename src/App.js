import React from "react";

import "./App.css";
import Login from "./components/Login";
import Registrarse from "./components/Registrarse";
import Profile from "./components/Profile";

import { Routes, Route, Link, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App"></div>
      <div>
        <Routes>
          <Route path="/" element={<Navigate replace to="/registrarse"/>} />
            
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
