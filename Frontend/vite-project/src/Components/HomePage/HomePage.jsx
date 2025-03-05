// // just_home/Frontend/vite-project/src/Components/HomePage/HomePage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { FaSearch, FaHome, FaUserTie, FaKey  } from "react-icons/fa";
// import "./HomePage.css";
// import Mainnavbar from "../Mainnav/Mainnavbar";
// import Footer from "../Footer/Footer";
// import { categories } from "../../assets/data"; // Import the same categories


// const HomePage = () => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");




//   const handleCategoryClick = (categoryName) => {
//     navigate(`/search?query=${encodeURIComponent(categoryName)}`);
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get("https://just-home.onrender.com/properties");

//         // Sort properties by overallRating in descending order
//         const sortedProperties = response.data.sort((a, b) => b.overallRating - a.overallRating);

//         // Get top 3 properties
//         setProperties(sortedProperties.slice(0, 4));
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const handleStateClick = (state) => {
//     console.log("Navigating to state:", state);
//     navigate("/state-properties", { state: { selectedState: state } });
//   };

//   return (
//     <div>
//       <Mainnavbar />

//       {/* Section: Find Properties in Cities */}
//       {/* <div className="App">
//         <section className="city-properties">
//           <h1 className="heading1">Find Properties in These Cities</h1>
//           <p className="just_below">Select a city to explore properties</p>

//           <div className="city-cards-line1">
//             <button className="card1button" onClick={() => handleStateClick("New York")}>
//               <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166305/mtsao2oyk48oty5llpbk.png" alt="New York" />
//             </button>
//             <button className="card2button" onClick={() => handleStateClick("California")}>
//               <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740162750/sjz8yuxj42s5cyoee6pc.png" alt="California" />
//             </button>
//             <button className="card3button" onClick={() => handleStateClick("Illinois")}>
//               <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166204/hppeskktajagwb4kj8pn.png" alt="Illinois" />
//             </button>
//           </div>

//           <div className="city-cards-line2">
//             <button className="card4button" onClick={() => handleStateClick("Texas")}>
//               <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166232/hno1sqxuurmbr3gc2rvs.png" alt="Texas" />
//             </button>
//             <button className="card5button" onClick={() => handleStateClick("Florida")}>
//               <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166286/tkb58dg7ydo6vjct4mih.png" alt="Florida" />
//             </button>
//             <button className="card6button" onClick={() => handleStateClick("Washington")}>
//               <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166305/mtsao2oyk48oty5llpbk.png" alt="Washington" />
//             </button>
//           </div>
//         </section>
//       </div> */}




//       <div className="homepage-container">
//         <div className="search-section">
//           <h1 className="search-title">Believe in finding it</h1>
//           <p className="search-subtitle">Search properties for sale and to rent</p>

//           {/* Search Bar */}
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="What type of property are you looking for?"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Allow Enter key to trigger search
//             />
//             <button className="search-btn" onClick={handleSearch}>
//               <FaSearch />
//             </button>
//           </div>

//           <h3 className="search-category-title">What are you looking for?</h3>

//           <div className="property-categories">
//   {categories.map((category) => (
//     <div
//       key={category.label}
//       className="category"
//       onClick={() => handleCategoryClick(category.label)}
//     >
//       <div className="category-icon" style={{ backgroundColor: category.color }}>
//         {category.icon} {/* Use the same icons from categories */}
//       </div>
//       <span>{category.label}</span>
//     </div>
//   ))}
// </div>
//         </div>
//       </div>

//       {/* Section: Top Rated Properties */}
//       <div className="landing-page">
//         {/* Cover Image Section */}
//         {/* <div className="cover-image">
//           <img src="https://source.unsplash.com/1600x600/?real-estate" alt="Cover" />
//           <div className="cover-text">
//             <h1>Find Your Dream Home</h1>
//             <p>Discover the best properties with top ratings</p>
//           </div>
//         </div> */}

//         <h2 className="section-title">Top Rated Properties</h2>
//         <div className="properties-container">
//           {properties.map((property) => (
//             <Link key={property._id} to={`/property/${property._id}`} className="property-card">
//               <img
//                 src={property.coverimg || "https://source.unsplash.com/400x300/?house"}
//                 alt={property.title}
//                 className="property-image"
//               />
//               <div className="property-details">
//                 <h3>{property.title}</h3>
//                 <p><strong>Location:</strong> {property.location}</p>
//                 <p><strong>Price:</strong> {property.price} {property.priceUnit}</p>
//                 <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
//                 <p><strong>Overall Rating:</strong> ⭐ {property.overallRating}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>


//       {/* Section: Become a Real Estate Agent */}
//       <section className="real-estate-agent">
//         <div className="agent-text">
//           <h2>Become a Real Estate Agent</h2>
//           <p>Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut morbi. Leo diam diam.</p>
//           <div className="cta-container">
//             <a href="/register-agent" className="register-btn1">Register Now →</a>
//             <span className="contact-info">📞 +68 685 88666</span>
//           </div>
//         </div>

//         <div className="agent-image-container">
//           <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740196542/gjtsz4xhmpfjb6vjllf1.png" alt="Real Estate Agent" className="agent-image" />
//         </div>
//       </section>
//       <div className="how-it-works">
//         <h2>How It Works? Find a perfect home</h2>
//         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

//         <div className="steps-container">
//           {/* Step 1 */}
//           <div className="step">
//             <div className="icon-circle">
//               <FaHome className="icon" />
//             </div>
//             <h3>Find Real Estate</h3>
//             <p>Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco.</p>
//           </div>

//           {/* Step 2 */}
//           <div className="step">
//             <div className="icon-circle">
//               <FaUserTie className="icon" />
//             </div>
//             <h3>Meet Realtor</h3>
//             <p>Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco.</p>
//           </div>

//           {/* Step 3 */}
//           <div className="step">
//             <div className="icon-circle">
//               <FaKey className="icon" />
//             </div>
//             <h3>Take The Keys</h3>
//             <p>Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco.</p>
//           </div>
//         </div>
//       </div>

//       <Footer />

//     </div>
//   );
// };

// export default HomePage;


import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaHome, FaUserTie, FaKey, FaAmazon, FaSpotify, FaCamera } from "react-icons/fa";
import "./HomePage.css";
import Mainnavbar from "../Mainnav/Mainnavbar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import { SiAmd, SiCisco, SiLogitech, } from "react-icons/si";
import Newsletter from "../Newsletter/Newsletter";

const HomePage = () => {
  const [randomProperties, setRandomProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://just-home.onrender.com/properties");
        const properties = response.data;

        // Shuffle properties randomly
        const shuffled = properties.sort(() => 0.5 - Math.random());

        // Select first 3 random properties
        setRandomProperties(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);
  const navigate = useNavigate(); // Initialize navigation


  const handleFilterClick = (filterType) => {
    navigate(`/search-results?filter=${filterType}`);
  };

  return (
    <div>
      <Mainnavbar />
      <div className="homepage-container">
        <div className="homepage-content">
          <p className="sub-text">We’re more than 745,000 apartments, places & plots.</p>
          <h1 className="main-heading">Find Your Perfect Home</h1>
          <div className="divider"></div>
          <SearchBar />

          <div className="property-filter-container">
            <h2 className="filter-heading">Explore all properties</h2>
            <div className="filter-buttons">
              <button className="filter-btn" onClick={() => handleFilterClick("all")}>
                All Properties
              </button>
              <button className="filter-btn" onClick={() => handleFilterClick("sale")}>
                For Sale
              </button>
              <button className="filter-btn" onClick={() => handleFilterClick("rent")}>
                For Rent
              </button>
            </div>
          </div>;
        </div>

        <div className="homepage-image">
          <img
            src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741005590/wb7b7wnxpdxj5xo9fkwm.png"
            alt="Houses"
            className="homepage-img full-screen-img"
          />
        </div>
      </div>

      <div className="trusted-companies">
      <p>Thousands of world's leading companies trust Space</p>
      <div className="icon-container">
        <FaAmazon size={40} />
        <SiAmd size={40} />
        <SiCisco size={40} />
        <SiLogitech size={40} />
        <FaSpotify size={40} />
      </div>
    </div>

    <div className="dream-house-container">

      <h2 className="title">Find Your Dream House as Easy as 1,2,3</h2>
      <p className="subtitle">Lorem ipsum dolor sit amet</p>
      <div className="steps-container">
        <div className="step">
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741069020/jjnspd5wqgtwtse7fpue.png" alt="Search Home" className="step-img" />
          <h3 className="step-title">1. Search for your favorite house in your location</h3>
          <p className="step-description">
            Pellentesque egestas elementum egestas faucibus sem.
          </p>
        </div>
        <div className="step">
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741069101/a75hqamtcugduhdynlrz.png" alt="Make Appointment" className="step-img" />
          <h3 className="step-title">2. Make a visit appointment with one of our agents</h3>
          <p className="step-description">
            Pellentesque egestas elementum egestas faucibus sem.
          </p>
        </div>
        <div className="step">
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741069123/ujucvdesdwvm8d8yhknx.png" alt="Get Dream House" className="step-img" />
          <h3 className="step-title">3. Get your dream house in a month, or less</h3>
          <p className="step-description">
            Pellentesque egestas elementum egestas faucibus sem.
          </p>
        </div>
      </div>
    </div>

      {/* 🔹 Random Properties Section */}
      <section className="random-properties">
        <h2 className="section-title">Featured Properties</h2>
        <div className="property-grid">
          {randomProperties.map((property) => (
            <div key={property._id} className="property-card">
              <img src={property.image} alt={property.name} className="property-img" />
              <h3 className="property-name">{property.name}</h3>
              <p className="property-price">${property.price}</p>
              <Link to={`/property/${property._id}`} className="view-details">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Become a Real Estate Agent Section */}
      {/* <section className="real-estate-agent">
        <div className="agent-text">
          <h2>Become a Real Estate Agent</h2>
          <p>Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut morbi. Leo diam diam.</p>
          <div className="cta-container">
            <a href="/register-agent" className="register-btn1">Register Now →</a>
            <span className="contact-info">📞 +68 685 88666</span>
          </div>
        </div>

        <div className="agent-image-container">
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740196542/gjtsz4xhmpfjb6vjllf1.png" alt="Real Estate Agent" className="agent-image" />
        </div>
      </section> */}



    <section className="why-work-container">
      {/* Left side images */}
      <div className="image-section">
        <div className="overlay-image">
          <img className="family" src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741147233/mqymnzw7q3v3tmwksdgx.png" alt="Happy Family" />
        </div>
        <div className="main-image">
          <img  src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741147374/leegx0mdhoh7nlpuzxwp.png" alt="Modern House" />
        </div>
        <div className="property-tag">
         <img  src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741148232/k7ltgn2ymwyaxsx3thop.png" alt="" />
          
        </div>
      </div>

      {/* Right side text */}
      <div className="text-section">
        <h2>Why You Should Work With Us</h2>
        <p>
          Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut morbi. Leo diam diam.
        </p>
        <ul>
          <p>✔ 100% Secure</p>
          <p>✔ Wide Range of Properties</p>
          <p>✔ Buy or Rent Homes</p>
          <p>✔ Trusted by Thousands</p>
        </ul>
        <button className="learn-more-btn">Learn More →</button>
      </div>
    </section>
  



      <div className="home-section">
        <div className="home-card">
          {/* Left Card */}
          <div className="home-card-content">
            <h2>Looking for the new home?</h2>
            <p>10 new offers every day. 350 offers on site, trusted by a community of thousands of users.</p>
            <button className="home-btn">Get Started →</button>
          </div>
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741010102/ytxvtxbk97lawdofdxk1.png" alt="House" className="home-image" />
        </div>

        <div className="home-card right-card">
          {/* Right Card */}
          <div className="home-card-content">
            <h2>Want to sell your home?</h2>
            <p>10 new offers every day. 350 offers on site, trusted by a community of thousands of users.</p>
            <button className="home-btn">Get Started →</button>
          </div>
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741010129/xu2chkh6l3pyjipklmmz.png" alt="House" className="home-image" />
        </div>
      </div>

      
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
