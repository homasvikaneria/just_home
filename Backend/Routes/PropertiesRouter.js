// Backend/Routes/PropertiesRouter.js
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
  getPropertiesByBedrooms
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
PropertyRouter.post("/", upload.array("photos", 5), (req, res, next) => {
  if (req.body.address) {
    req.body.address = JSON.parse(req.body.address);
  }
  if (req.body.essentialInfo) {
    req.body.essentialInfo = JSON.parse(req.body.essentialInfo);
  }
  if (req.body.charmInfo) {
    req.body.charmInfo = JSON.parse(req.body.charmInfo);
  }
  if (req.body.owner) {
    req.body.owner = JSON.parse(req.body.owner);
  }
  next();
}, createProperty);
// Other Routes
PropertyRouter.get("/", getAllProperties);
PropertyRouter.get("/city/:city", getPropertiesByCity);
PropertyRouter.get("/state/:state", getPropertiesByState);
PropertyRouter.get("/landmark/:landmark", getPropertiesByLandmark);
PropertyRouter.get("/listingType/:type", getPropertiesByListingType);
PropertyRouter.get("/byPriceRange", getPropertiesByPriceRange);
PropertyRouter.get("/category/:category", getPropertiesByCategory);
PropertyRouter.get("/features", getPropertiesByFeatures);
PropertyRouter.get("/byBedrooms", getPropertiesByBedrooms); // ✅ Move this **before** the ID route

PropertyRouter.put("/:id", upload.array("photos", 5), updateProperty);
PropertyRouter.delete("/:id", deleteProperty);

// ✅ Move this to the bottom
PropertyRouter.get("/:id", getPropertyById); // Catch-all should be last

export default PropertyRouter;
