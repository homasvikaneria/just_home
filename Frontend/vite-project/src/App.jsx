// just_home/Frontend/vite-project/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "../src/Components/Signup/Signup.jsx";
import LoginPage from "../src/Components/Login/Login.jsx";
import LandingPage from "../src/Components/LandingPage/LandingPage.jsx";
import HomePage from "../src/Components/HomePage/HomePage.jsx"



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />

      </Routes>
    </Router>
  );
};

export default App;
