import express from "express";
import multer from "multer";
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

// Initialize Express Router
const PropertyRouter = express.Router();

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: "./public/uploads", // Save files in this directory
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Use upload middleware for property creation
PropertyRouter.post("/", upload.array("photos", 5), createProperty); // Fix: Use upload **after** defining it

// Other Routes
PropertyRouter.get("/", getAllProperties);
PropertyRouter.get("/city/:city", getPropertiesByCity);
PropertyRouter.get("/state/:state", getPropertiesByState);
PropertyRouter.get("/landmark/:landmark", getPropertiesByLandmark);
PropertyRouter.get("/listing-type/:type", getPropertiesByListingType);
PropertyRouter.get("/price-range", getPropertiesByPriceRange);
PropertyRouter.get("/category/:category", getPropertiesByCategory);
PropertyRouter.get("/features", getPropertiesByFeatures);
PropertyRouter.get("/:id", getPropertyById);
PropertyRouter.put("/:id", upload.array("photos", 5), updateProperty);
PropertyRouter.delete("/:id", deleteProperty);

export default PropertyRouter;
