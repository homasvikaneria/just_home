// just_home/Frontend/vite-project/src/App.jsx
// Frontend/vite-project/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainnavbar from "./Components/Mainnav/Mainnavbar";
import LandingPage from "../src/Components/LandingPage/LandingPage.jsx";


const App = () => {
  return (
    <Router>
      {/* <Mainnavbar /> */}
      <Routes>
      <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
