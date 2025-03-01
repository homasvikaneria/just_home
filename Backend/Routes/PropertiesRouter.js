// Backend/Routes/PropertiesRouter.js
import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertiesByCity,
  getPropertiesByState,
  getPropertiesByLandmark,
  getPropertiesByListingType,
  getPropertiesByPriceRange,
  getPropertiesByCategory,
  getPropertiesByFeatures,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../Controller/PropertiesController.js";

const PropertyRouter = express.Router();

// Add new property
PropertyRouter.post("/", createProperty);

// Get all properties
PropertyRouter.get("/", getAllProperties);

// Get properties by city
PropertyRouter.get("/city/:city", getPropertiesByCity);

// Get properties by state
PropertyRouter.get("/state/:state", getPropertiesByState);

// Get properties by landmark
PropertyRouter.get("/landmark/:landmark", getPropertiesByLandmark);

// Get properties by listing type (rent/sale)
PropertyRouter.get("/listing-type/:type", getPropertiesByListingType);

// Get properties by price range
PropertyRouter.get("/price-range", getPropertiesByPriceRange);

// Get properties by selected category
PropertyRouter.get("/category/:category", getPropertiesByCategory);

// Get properties by selected features
PropertyRouter.get("/features", getPropertiesByFeatures);

// Get property by ID
PropertyRouter.get("/:id", getPropertyById);

// Update property
PropertyRouter.put("/:id", updateProperty);

// Delete property
PropertyRouter.delete("/:id", deleteProperty);

export default PropertyRouter;