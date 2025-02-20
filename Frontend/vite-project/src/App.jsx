import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainproperties from "./Components/Properties/Mainproperties";
import LandingPage from "./Components/Landingpage/Landingpage";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Contactus from "./Components/Contactus/Contactus";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mainproperties" element={<Mainproperties />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contactus />} />

      </Routes>
    </Router>
  );
};

export default App;
