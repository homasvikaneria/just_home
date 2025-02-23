// Frontend/vite-project/src/Components/PropertyDetails/PropertyDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams(); // Get property ID from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rentalDays, setRentalDays] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/properties/${id}`) // Fetch property details
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="property-loading">Loading property details...</p>;
  if (!property) return <p className="property-not-found">Property not found.</p>;

  return (
    <div className="property-details-container">
      <h1 className="property-title">{property.title}</h1>
      <img src={property.coverimg} alt={property.title} className="property-image" />
      <p className="property-type">{property.propertyType}</p>
      <p className="property-location">📍 {property.location}</p>

      {property.status === "For Sale" ? (
        <p className="property-price">
          💰 Price: <strong>${property.price}</strong>
        </p>
      ) : (
        <div className="rental-section">
          <p className="rental-text">🏠 Available for Rent</p>
          <label>Select rental duration:</label>
          <DatePicker
            selected={rentalDays}
            onChange={(date) => setRentalDays(date)}
            minDate={new Date()}
            placeholderText="Select rental period"
          />
        </div>
      )}

      <p className="property-description">{property.description}</p>
    </div>
  );
};

export default PropertyDetails;
