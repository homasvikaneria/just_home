// Frontend/vite-project/src/Components/PropertyForm/PropertyForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './PropertyForm.css'; // You'll need to create this CSS file

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    selectedCategory: '',
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
    photos: [], // This will store photo URLs
    charmInfo: {
      title: '',
      description: '',
      listingType: 'rent',
      price: 0,
    },
    owner: {
      name: '',
      phone: '',
      email: '',
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [photoFiles, setPhotoFiles] = useState([]);
  
  const features = [
    "Pet-Friendly Space", "Lush Garden", "Swimming Pool", "Mountain View",
    "Ocean View", "Air Conditioning", "Heating", "Wi-Fi", "Parking",
    "Washer/Dryer", "Kitchen", "Fireplace", "TV", "Gym", "Hot Tub"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: numValue
        }
      });
    } else {
      setFormData({ ...formData, [name]: numValue });
    }
  };

  const handleFeatureToggle = (feature) => {
    const updatedFeatures = [...formData.selectedFeatures];
    
    if (updatedFeatures.includes(feature)) {
      // Remove if already selected
      const index = updatedFeatures.indexOf(feature);
      updatedFeatures.splice(index, 1);
    } else {
      // Add if not selected
      updatedFeatures.push(feature);
    }
    
    setFormData({ ...formData, selectedFeatures: updatedFeatures });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotoFiles([...photoFiles, ...files]);
    
    // This is a simplification. In a real app, you would upload these images to a storage service
    // and then store the URLs. For now, we'll just store file names as placeholders.
    const newPhotoUrls = files.map(file => URL.createObjectURL(file));
    setFormData({
      ...formData,
      photos: [...formData.photos, ...newPhotoUrls]
    });
  };

  const removePhoto = (index) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    
    const updatedPhotoFiles = [...photoFiles];
    updatedPhotoFiles.splice(index, 1);
    
    setFormData({ ...formData, photos: updatedPhotos });
    setPhotoFiles(updatedPhotoFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      // In a real application, you would upload the photos to a storage service here
      // and replace the URLs in formData.photos with the actual URLs from the storage service

      // Send data to the server
      console.log(formData);
      
      const response = await axios.post('http://localhost:8000/properties', formData);
      
      setMessage({
        text: 'Property listing created successfully!',
        type: 'success'
      });
      
      // Reset form
      setFormData({
        selectedCategory: '',
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
          price: 0,
        },
        owner: {
          name: '',
          phone: '',
          email: '',
        }
      });
      setPhotoFiles([]);
      
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="property-form-container">
      <h1>Create Property Listing</h1>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="property-form">
        {/* Step 1: Property Category */}
        <div className="form-section">
          <h2>Property Category</h2>
          <div className="form-group">
            <label htmlFor="selectedCategory">Property Type</label>
            <select
              id="selectedCategory"
              name="selectedCategory"
              value={formData.selectedCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Whole Home">Whole Home</option>
              <option value="Private Room">Private Room</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
            </select>
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
                onChange={handleNumberChange}
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
                onChange={handleNumberChange}
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
                onChange={handleNumberChange}
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
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>
        </div>
        
        {/* Step 4: Features */}
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
        
        {/* Step 5: Photos */}
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
          <div className="form-group">
            <label htmlFor="owner.name">Name*</label>
            <input
              type="text"
              id="owner.name"
              name="owner.name"
              value={formData.owner.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="owner.phone">Phone*</label>
              <input
                type="tel"
                id="owner.phone"
                name="owner.phone"
                value={formData.owner.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="owner.email">Email*</label>
              <input
                type="email"
                id="owner.email"
                name="owner.email"
                value={formData.owner.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Creating Listing...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;