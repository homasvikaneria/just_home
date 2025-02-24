import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Mainnavbar from "./Components/Mainnav/Mainnavbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import HomePage from "./Components/HomePage/HomePage";
import Footer from "./Components/Footer/Footer";
import SearchResults from "./Components/SearchResults/SearchResults";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";  // ✅ Correct Import
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Listings from "./Components/Listing/Listings";
import CreateListing from "./Components/CreateListing/CreateListing";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <Mainnavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetails />} />  // ✅ View property details
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-listing" element={<CreateListing />} />  // ✅ Create new listing
        <Route path="/edit-listing/:id" element={<CreateListing />} />  // ✅ Edit listing
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
