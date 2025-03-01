// Backend/Model/Properties.Model.js
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  // Selected Category
  selectedCategory: { type: String, required: true }, // e.g., "Whole Home", "Private Room", etc.

  // Address
  address: {
    street: { type: String, required: true },
    apartment: { type: String }, // Optional
    landmark: { type: String }, // Optional
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },

  // Essential Info
  essentialInfo: {
    guests: { type: Number, required: true, min: 1 }, // Number of guests
    bedrooms: { type: Number, required: true, min: 1 }, // Number of bedrooms
    bathrooms: { type: Number, required: true, min: 1 }, // Number of bathrooms
    beds: { type: Number, required: true, min: 1 }, // Number of beds
  },

  // Selected Features
  selectedFeatures: [{ type: String }], // Array of selected features (e.g., "Pet-Friendly Space", "Lush Garden", etc.)

  // Photos
  photos: [{ type: String }], // Array of photo URLs (after uploading to a storage service)

  // Charm Info
  charmInfo: {
    title: { type: String, required: true }, // Property title
    description: { type: String, required: true }, // Property description
    listingType: { type: String, enum: ["rent", "sale"], required: true }, // Rent or Sale
    price: { type: Number, required: true }, // Price (per day for rent or total for sale)
  },

  // Owner Info (if needed)
  owner: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },

  // Timestamp
  createdAt: { type: Date, default: Date.now },
});

export const Property = mongoose.model("Property", PropertySchema);

