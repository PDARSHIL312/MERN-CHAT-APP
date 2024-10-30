import { useState } from "react";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import "./App.css";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* <Login /> */}
      {/* <SignUp /> */}
      <Home />
    </div>
  );
}

export default App;
