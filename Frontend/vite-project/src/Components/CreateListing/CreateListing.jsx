import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateListing.css";

const CreateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState({
    title: "",
    propertyType: "",
    location: "",
    price: "",
    status: "For Sale",
    description: "",
    coverimg: "",
  });

  const [loading, setLoading] = useState(true);
  const [rentalDays, setRentalDays] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8000/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const method = id ? "PUT" : "POST";
    const endpoint = id ? `http://localhost:8000/properties/${id}` : "http://localhost:8000/properties";
    
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      if (response.ok) {
        alert(`Property ${id ? "updated" : "added"} successfully!`);
        navigate("/listings");
      } else {
        throw new Error("Failed to save property");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <p className="property-loading">Loading property details...</p>;

  return (
    <div className="property-details-container">
      <h1>{id ? "Edit Listing" : "Create a New Listing"}</h1>
      
      <form onSubmit={handleSubmit} className="property-form">
        <label>Title:</label>
        <input type="text" name="title" value={property.title} onChange={handleChange} required />

        <label>Property Type:</label>
        <input type="text" name="propertyType" value={property.propertyType} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={property.location} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={property.price} onChange={handleChange} required />

        <label>Status:</label>
        <select name="status" value={property.status} onChange={handleChange}>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>

        {property.status === "For Rent" && (
          <div className="rental-section">
            <label>Select rental duration:</label>
            <DatePicker
              selected={rentalDays}
              onChange={(date) => setRentalDays(date)}
              minDate={new Date()}
              placeholderText="Select rental period"
            />
          </div>
        )}

        <label>Description:</label>
        <textarea name="description" value={property.description} onChange={handleChange} required />

        <label>Cover Image URL:</label>
        <input type="text" name="coverimg" value={property.coverimg} onChange={handleChange} required />

        <button type="submit">{id ? "Update Listing" : "Create Listing"}</button>
      </form>
    </div>
  );
};

export default CreateListing;
