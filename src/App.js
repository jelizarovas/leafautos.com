import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

function App() {
  return (
    <div className="App flex flex-col  min-h-screen">
      <NavBar />
      <Contact />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
