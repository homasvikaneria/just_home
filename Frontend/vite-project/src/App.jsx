// just_home/Frontend/vite-project/src/App.jsx
// Frontend/vite-project/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainnavbar from "./Components/Mainnav/Mainnavbar";

const App = () => {
  return (
    <Router>
      <Mainnavbar />
      <Routes>
        {/* Add your routes here */}
      </Routes>
    </Router>
  );
};

export default App;
