// Frontend/vite-project/src/Components/PropertyForm/PropertyForm.jsx
import React, { useState } from "react";
import {
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { FaPaw, FaTree, FaWifi, FaBed, FaBath, FaCar, FaTv, FaFireExtinguisher, FaFirstAid, FaUtensils, FaBlender, FaFan, FaCamera, FaParking, FaKey, FaFire } from "react-icons/fa"; // Example icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Listings from "../Listing/Listings"; // Import the Listings component
import Mainnavbar from "../Mainnav/Mainnavbar";

const AddPropertyForm = () => {
  // State for form fields
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    landmark: "",
    country: "",
    city: "",
    state: "",
  });
  const [essentialInfo, setEssentialInfo] = useState({
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
  });
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [charmInfo, setCharmInfo] = useState({
    title: "",
    description: "",
    listingType: "rent",
    price: "",
  });

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Handle address change
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };

  // Handle essential info change (increment/decrement)
  const handleEssentialInfoChange = (field, delta) => {
    setEssentialInfo((prev) => ({
      ...prev,
      [field]: Math.max(1, prev[field] + delta), // Ensure value doesn't go below 1
    }));
  };

  // Handle feature selection
  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  // Handle photo upload
  const handlePhotoUpload = (event) => {
    setPhotos([...event.target.files]);
  };

  // Handle charm info change
  const handleCharmInfoChange = (event) => {
    const { name, value } = event.target;
    setCharmInfo({ ...charmInfo, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      selectedCategory,
      address,
      essentialInfo,
      selectedFeatures,
      photos,
      charmInfo,
    };
    console.log("Form Data:", formData);
    // Send formData to backend
  };

  // Property type options
  const propertyTypes = [
    {
      label: "Whole Home",
      description: "Enjoy complete privacy with the entire home to yourself.",
    },
    {
      label: "Private Room",
      description: "Relax in your own room while sharing common areas.",
    },
    {
      label: "Guest Suite",
      description: "Experience comfort in a private suite within a larger property.",
    },
    {
      label: "Shared Apartment",
      description: "Stay in a cozy apartment with shared facilities.",
    },
  ];

  // Feature options
  const features = [
    { icon: <FaPaw />, label: "Pet-Friendly Space" },
    { icon: <FaTree />, label: "Lush Garden" },
    { icon: <FaWifi />, label: "High-Speed Wifi" },
    { icon: <FaBed />, label: "Luxury Bathtub" },
    { icon: <FaBath />, label: "Premium Care Essentials" },
    { icon: <FaCar />, label: "Complimentary Parking" },
    { icon: <FaTv />, label: "Smart TV" },
    { icon: <FaFireExtinguisher />, label: "Safety Fire Extinguisher" },
    { icon: <FaFirstAid />, label: "Emergency First Aid Kit" },
    { icon: <FaUtensils />, label: "Complete Cooking Set" },
    { icon: <FaBlender />, label: "Large Refrigerator" },
    { icon: <FaFan />, label: "Climate Control - AC" },
    { icon: <FaCamera />, label: "Surveillance Cameras" },
    { icon: <FaParking />, label: "Contactless Check-in" },
    { icon: <FaKey />, label: "Private Terrace/Balcony" },
    { icon: <FaFire />, label: "Campfire Experience" },
  ];

  return (
    <div>
      <Mainnavbar/>

    <Grid container spacing={4} style={{ padding: "40px" }}>
      {/* Listings Component on Top */}
      <Grid item xs={12}>
        <Listings onSelectCategory={handleCategorySelect} />
      </Grid>

      {/* Property Type and Address Side by Side */}
      <Grid item xs={12} container spacing={4}>
        {/* Property Type Section */}
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ color: "text.primary", fontWeight: "bold" ,margin:"0px 0px 20px 0px"}}>
            What is the type of your place?
          </Typography>
          <Grid container spacing={2}>
            {propertyTypes.map((type) => (
              <Grid item key={type.label} xs={12}>
                <Card
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedCategory === type.label ? "#e0e0e0" : "#fff",
                    padding: "0px",
                  }}
                  onClick={() => handleCategorySelect(type.label)}
                >
                  <CardContent>
                    <Typography variant="h6">{type.label}</Typography>
                    <Typography variant="body2">{type.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Address Section */}
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ color: "text.primary", fontWeight: "bold",margin:"0px 0px 20px 0px" }}>
            What's the address of your place?
          </Typography>
          <TextField
            fullWidth
            label="Street Address"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Apartment, Suite (opt)"
            name="apartment"
            value={address.apartment}
            onChange={handleAddressChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Landmark"
            name="landmark"
            value={address.landmark}
            onChange={handleAddressChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={address.country}
            onChange={handleAddressChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="State"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            style={{ marginBottom: "10px" }}
          />
        </Grid>
      </Grid>

      {/* Increment/Decrement Section */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ color: "text.primary", fontWeight: "bold" , margin:"10px 0px 20px 0px" }}>
          Provide some essential info about your place
        </Typography>
        <Grid container spacing={0.5}>
          {["guests", "bedrooms", "bathrooms", "beds"].map((field) => (
            <Grid item key={field} xs={3}>
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => handleEssentialInfoChange(field, -1)}
                  disabled={essentialInfo[field] <= 1} // Disable if value is 1
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" style={{ margin: "0 10px" }}>
                  {essentialInfo[field]}
                </Typography>
                <IconButton onClick={() => handleEssentialInfoChange(field, 1)}>
                  <AddIcon />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Features Section */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ color: "text.primary", fontWeight: "bold",margin:"10px 0px 20px 0px" }}>
          Describe the features of your location
        </Typography>
        <Grid container spacing={1}>
          {features.map((feature) => (
            <Grid item key={feature.label} xs={2.4}>
              <Card
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedFeatures.includes(feature.label)
                    ? "#e0e0e0"
                    : "#fff",
                  padding: "5px 5px 5px 5px",
                }}
                onClick={() => handleFeatureToggle(feature.label)}
              >
                <CardContent style={{ display: "flex", alignItems: "center" }}>
                  {feature.icon}
                  <Typography variant="body2" style={{ marginLeft: "10px", fontSize:"16px" , }}>
                    {feature.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Photos Section */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ color: "text.primary", fontWeight: "bold",margin:"10px 0px 20px 0px" }}>
          Include images showcasing your property?
        </Typography>
        <input
          type="file"
          multiple
          onChange={handlePhotoUpload}
          style={{ marginTop: "10px" }}
        />
      </Grid>

      {/* Charm and Excitement Section */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ color: "text.primary", fontWeight: "bold" ,margin:"10px 0px 20px 0px"}}>
          How would you characterize the charm and excitement of your property?
        </Typography>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={charmInfo.title}
          onChange={handleCharmInfoChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={charmInfo.description}
          onChange={handleCharmInfoChange}
          style={{ marginBottom: "10px" }}
        />
        <RadioGroup
          value={charmInfo.listingType}
          onChange={(e) =>
            setCharmInfo({ ...charmInfo, listingType: e.target.value })
          }
          row
        >
          <FormControlLabel value="rent" control={<Radio />} label="For Rent" />
          <FormControlLabel value="sale" control={<Radio />} label="For Sale" />
        </RadioGroup>
        <TextField
          fullWidth
          label={charmInfo.listingType === "rent" ? "Price per Day" : "Price"}
          name="price"
          value={charmInfo.price}
          onChange={handleCharmInfoChange}
          style={{ marginBottom: "10px" }}
        />
      </Grid>

      {/* Add Property Button */}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Property
        </Button>
      </Grid>
    </Grid>
    </div>
  );
};


export default AddPropertyForm;