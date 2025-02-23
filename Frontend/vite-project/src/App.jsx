// just_home/Frontend/vite-project/src/App.jsx
// Frontend/vite-project/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainnavbar from "./Components/Mainnav/Mainnavbar";
import LandingPage from "../src/Components/LandingPage/LandingPage.jsx";
import HomePage from "../src/Components/HomePage/HomePage.jsx";
import Footer from "../src/Components/Footer/Footer.jsx"; 
import SearchResults from "./Components/SearchResults/SearchResults.jsx";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";




const App = () => {
  return (
    <Router>
      {/* <Mainnavbar /> */}
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetails />} /> {/* Property details route */}


      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
