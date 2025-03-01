// Frontend/vite-project/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Mainnavbar from "./Components/Mainnav/Mainnavbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import HomePage from "./Components/HomePage/HomePage";
import Footer from "./Components/Footer/Footer";
import SearchResults from "./Components/SearchResults/SearchResults";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Listings from "./Components/Listing/Listings";
import EditProfile from "./Components/Profile/Profile"; 
import PropertyForm from "./Components/PropertyForm/PropertyForm";
import Wishlist from "./Components/Wishlist/Wishlist"; // ✅ Import Wishlist page
import ContactForm from "./Components/Contactus/Contactus";
import BlogSection from "./Components/Blog/Blog";



// import NotFound from "./Components/NotFound/NotFound"; // ✅ Handle 404 pages

// 🔒 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      {/* <Mainnavbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/blog" element={<BlogSection />} />


        


        {/* 🔒 Protect Routes that Require Authentication */}
        <Route
          path="/propertyform"
          element={
            <ProtectedRoute>
              <PropertyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-listing/:id"
          element={
            <ProtectedRoute>
              <PropertyForm />
            </ProtectedRoute>
          }
        />

        {/* Handle Unknown Routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
