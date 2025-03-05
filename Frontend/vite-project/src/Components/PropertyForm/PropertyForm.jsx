// just_home/Frontend/vite-project/src/Components/PropertyForm/PropertyForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Listings from '../Listing/Listings';
import './PropertyForm.css';
import Mainnavbar from '../Mainnav/Mainnavbar'; 

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    selectedCategory: '',
    category: '', // Added category field
    address: {
      street: '',
      apartment: '',
      landmark: '',
      country: '',
      city: '',
      state: '',
    },
    essentialInfo: {
      guests: 1,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
    },
    selectedFeatures: [],
    photos: [],
    charmInfo: {
      title: '',
      description: '',
      listingType: 'rent',
      price: { amount: 0, currency: 'INR' }, // Fixed price structure
    },
    owner: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [photoFiles, setPhotoFiles] = useState([]);

  const features = [
    "Pet-Friendly Space", "Lush Garden", "Swimming Pool", "Mountain View",
    "Ocean View", "Air Conditioning", "Heating", "Wi-Fi", "Parking",
    "Washer/Dryer", "Kitchen", "Fireplace", "TV", "Gym", "Hot Tub"
  ];

  const handleCategorySelection = (category) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedCategory: category,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;

    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: Math.max(0, numValue),
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: Math.max(0, numValue) }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prevData) => {
      const updatedFeatures = prevData.selectedFeatures.includes(feature)
        ? prevData.selectedFeatures.filter(f => f !== feature)
        : [...prevData.selectedFeatures, feature];

      return { ...prevData, selectedFeatures: updatedFeatures };
    });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setPhotoFiles((prevFiles) => [...prevFiles, ...files]);

    const newPhotoUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ...newPhotoUrls],
    }));
  };

  const removePhoto = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));

    setPhotoFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const submissionData = new FormData();

      submissionData.append("selectedCategory", formData.selectedCategory);
      submissionData.append("category", formData.category); // Ensure category is sent
      Object.entries(formData.address).forEach(([key, value]) =>
        submissionData.append(`address[${key}]`, value)
      );
      Object.entries(formData.essentialInfo).forEach(([key, value]) =>
        submissionData.append(`essentialInfo[${key}]`, value)
      );
      formData.selectedFeatures.forEach((feature, index) =>
        submissionData.append(`selectedFeatures[${index}]`, feature)
      );
      Object.entries(formData.charmInfo).forEach(([key, value]) => {
        if (key === "price") {
          submissionData.append("charmInfo.price.amount", formData.charmInfo.price.amount);
          submissionData.append("charmInfo.price.currency", formData.charmInfo.price.currency);
        } else {
          submissionData.append(`charmInfo[${key}]`, value);
        }
      });
      Object.entries(formData.owner).forEach(([key, value]) =>
        submissionData.append(`owner[${key}]`, value)
      );

      // Append uploaded photos
      photoFiles.forEach((file) => submissionData.append("photos", file));

      console.log("Submitting the following data:");
      for (let [key, value] of submissionData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(
        "http://localhost:8000/properties",
        submissionData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Property created:", response.data);
      setMessage({ text: "Property listing created successfully!", type: "success" });

      setFormData({
        selectedCategory: "",
        category: "",
        address: { street: "", apartment: "", landmark: "", country: "", city: "", state: "" },
        essentialInfo: { guests: 1, bedrooms: 1, bathrooms: 1, beds: 1 },
        selectedFeatures: [],
        photos: [],
        charmInfo: { title: "", description: "", listingType: "rent", price: { amount: 0, currency: "INR" } },
        owner: { name: "", phone: "", email: "" },
      });
      setPhotoFiles([]);
    } catch (error) {
      console.error("Error creating listing:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
      setMessage({
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };



  

  return (
    <div>
      <Mainnavbar/>
    <div className="property-form-container">
      <h1>Create Property Listing</h1>
      {/* Integrate Listings for category selection */}
      <Listings onSelectCategory={handleCategorySelection} />
      <form onSubmit={handleSubmit} className="property-form">
        {/* Step 1: Property Category */}
        <div className="form-section">
          <h2>Property Category</h2>
          <div className="form-group">
            <label htmlFor="selectedCategory">Selected Category</label>
            <input
              type="text"
              id="selectedCategory"
              name="selectedCategory"
              value={formData.selectedCategory}
              readOnly
            />
          </div>
        </div>

        {/* Step 2: Property Address */}
        <div className="form-section">
          <h2>Property Address</h2>
          <div className="form-group">
            <label htmlFor="address.street">Street Address*</label>
            <input
              type="text"
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address.apartment">Apartment/Suite (optional)</label>
            <input
              type="text"
              id="address.apartment"
              name="address.apartment"
              value={formData.address.apartment}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address.landmark">Landmark (optional)</label>
            <input
              type="text"
              id="address.landmark"
              name="address.landmark"
              value={formData.address.landmark}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address.country">Country*</label>
              <input
                type="text"
                id="address.country"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address.city">City*</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address.state">State/Province*</label>
              <input
                type="text"
                id="address.state"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Step 3: Essential Information */}
        <div className="form-section">
          <h2>Essential Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="essentialInfo.guests">Guests*</label>
              <input
                type="number"
                id="essentialInfo.guests"
                name="essentialInfo.guests"
                min="1"
                value={formData.essentialInfo.guests}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="essentialInfo.bedrooms">Bedrooms*</label>
              <input
                type="number"
                id="essentialInfo.bedrooms"
                name="essentialInfo.bedrooms"
                min="1"
                value={formData.essentialInfo.bedrooms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="essentialInfo.bathrooms">Bathrooms*</label>
              <input
                type="number"
                id="essentialInfo.bathrooms"
                name="essentialInfo.bathrooms"
                min="1"
                value={formData.essentialInfo.bathrooms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="essentialInfo.beds">Beds*</label>
              <input
                type="number"
                id="essentialInfo.beds"
                name="essentialInfo.beds"
                min="1"
                value={formData.essentialInfo.beds}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Step 4: Property Features */}
        <div className="form-section">
          <h2>Property Features</h2>
          <div className="features-container">
            {features.map((feature) => (
              <div className="feature-item" key={feature}>
                <input
                  type="checkbox"
                  id={`feature-${feature}`}
                  checked={formData.selectedFeatures.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                />
                <label htmlFor={`feature-${feature}`}>{feature}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Step 5: Property Photos */}
        <div className="form-section">
          <h2>Property Photos</h2>
          <div className="photo-upload">
            <input
              type="file"
              id="photos"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
            />
            <label htmlFor="photos" className="upload-button">Add Photos</label>
          </div>
          {formData.photos.length > 0 && (
            <div className="photo-preview-container">
              {formData.photos.map((photo, index) => (
                <div className="photo-preview" key={index}>
                  <img src={photo} alt={`Property ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="remove-photo"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step 6: Charm Information */}
        <div className="form-section">
          <h2>Property Details</h2>
          <div className="form-group">
            <label htmlFor="charmInfo.title">Title*</label>
            <input
              type="text"
              id="charmInfo.title"
              name="charmInfo.title"
              value={formData.charmInfo.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="charmInfo.description">Description*</label>
            <textarea
              id="charmInfo.description"
              name="charmInfo.description"
              value={formData.charmInfo.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="charmInfo.listingType">Listing Type*</label>
              <select
                id="charmInfo.listingType"
                name="charmInfo.listingType"
                value={formData.charmInfo.listingType}
                onChange={handleChange}
                required
              >
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="charmInfo.price">
                {formData.charmInfo.listingType === 'rent' ? 'Price per day*' : 'Sale Price*'}
              </label>
              <input
                type="number"
                id="charmInfo.price"
                name="charmInfo.price"
                value={formData.charmInfo.price}
                onChange={handleNumberChange}
                min="0"
                required
              />
            </div>
          </div>
        </div>

{/* Step 7: Owner Information */}
<div className="form-section">
  <h2>Owner Information</h2>
  {['name', 'phone', 'email'].map((field) => (
    <div key={field} className="form-group">
      <label htmlFor={`owner.${field}`}>
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      <input
        type="text"
        id={`owner.${field}`}
        name={`owner.${field}`}
        value={formData.owner[field]}
        onChange={handleChange}
        required
      />
    </div>
  ))}
</div>

<div className="form-actions">
  <button type="submit" className="submit-button" disabled={isLoading}>
    {isLoading ? 'Creating Listing...' : 'Create Listing'}
  </button>
</div>
</form>
</div>
</div>
);}

export default PropertyForm;

