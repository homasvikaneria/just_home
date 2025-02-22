// just_home/Frontend/vite-project/src/App.jsx
// Frontend/vite-project/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainnavbar from "./Components/Mainnav/Mainnavbar";
import LandingPage from "../src/Components/LandingPage/LandingPage.jsx";
import HomePage from "../src/Components/HomePage/HomePage.jsx";
import Footer from "../src/Components/Footer/Footer.jsx"; 




const App = () => {
  return (
    <Router>
      {/* <Mainnavbar /> */}
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<HomePage />} />

      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
