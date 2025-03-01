// Backend/Controller/PropertiesController.js
import {Property} from "../Model/Properties.Model.js";

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const { selectedCategory, address, essentialInfo, selectedFeatures, charmInfo, owner } = req.body;

    // Validate required fields
    if (!selectedCategory || !address.street || !charmInfo.title || !charmInfo.description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // // Assuming photos are uploaded and URLs are generated
    const photos = req.files?.map(file => file.path); // Replace with actual logic for generating URLs

    const property = new Property({
      selectedCategory,
      address,
      essentialInfo,
      selectedFeatures,
      photos,
      charmInfo,
      owner,
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by city
export const getPropertiesByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const properties = await Property.find({ "address.city": { $regex: city, $options: "i" } });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by state
export const getPropertiesByState = async (req, res) => {
  try {
    const { state } = req.params;
    const properties = await Property.find({ "address.state": { $regex: state, $options: "i" } });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by landmark
export const getPropertiesByLandmark = async (req, res) => {
  try {
    const { landmark } = req.params;
    const properties = await Property.find({ "address.landmark": { $regex: landmark, $options: "i" } });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by listing type (rent/sale)
export const getPropertiesByListingType = async (req, res) => {
  try {
    const { type } = req.params;
    const properties = await Property.find({ "charmInfo.listingType": type });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by price range
export const getPropertiesByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const filter = { "charmInfo.price": {} };

    if (minPrice) filter["charmInfo.price"].$gte = Number(minPrice);
    if (maxPrice) filter["charmInfo.price"].$lte = Number(maxPrice);

    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by selected category
export const getPropertiesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const properties = await Property.find({ selectedCategory: category });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by selected features
export const getPropertiesByFeatures = async (req, res) => {
  try {
    const { features } = req.query;
    const featuresArray = features.split(","); // Convert query string to array
    const properties = await Property.find({ selectedFeatures: { $all: featuresArray } });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const updates = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedProperty) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};