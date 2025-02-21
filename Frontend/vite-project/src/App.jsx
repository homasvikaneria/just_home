import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Signup/Signup"; // Adjust path if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
