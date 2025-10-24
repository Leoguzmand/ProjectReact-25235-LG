import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Electronics from "./pages/Electronics";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/administracion" element={<Login />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
