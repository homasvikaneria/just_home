// just_home/Backend/Controller/PropertiesController.js
import { Property } from '../Model/Properties.Model.js';

// GET /properties: Fetch all properties
export const getAllProperties = async (req, res) => {
    try {
        const propertiesList = await Property.find();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found.");
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/city/:cityName - Fetch properties by city
export const getPropertiesByCity = async (req, res) => {
    const cityName = req.params.cityName;
    try {
        const propertiesList = await Property.find({ location: { $regex: cityName, $options: 'i' } });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No properties found in this city.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/state/:stateName - Fetch properties by state
export const getPropertiesByState = async (req, res) => {
    const stateName = req.params.stateName;
    try {
        const propertiesList = await Property.find({ state: { $regex: stateName, $options: 'i' } });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No properties found in this state.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/category/:categoryName - Fetch properties by category
export const getPropertiesByCategory = async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const propertiesList = await Property.find({ category: { $regex: categoryName, $options: 'i' } });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No properties found in this category.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/rating - Fetch properties by minimum rating
export const getPropertiesByRating = async (req, res) => {
    const { minRating } = req.query;
    try {
        const propertiesList = await Property.find({ overallRating: { $gte: parseFloat(minRating) } });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No properties found with this rating.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/landmark/:landmark - Fetch properties by nearby landmark
export const getPropertiesByLandmark = async (req, res) => {
    const landmark = req.params.landmark;
    try {
        const propertiesList = await Property.find({ nearbyLandmarks: { $regex: landmark, $options: 'i' } });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No properties found near this landmark.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/pet-friendly/:petFriendly - Fetch pet-friendly properties
export const getPetFriendlyProperties = async (req, res) => {
    const petFriendly = req.params.petFriendly === 'true';
    try {
        const propertiesList = await Property.find({ petFriendly });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No pet-friendly properties found.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/bedrooms/:number - Fetch properties by number of bedrooms
export const getPropertiesByBedrooms = async (req, res) => {
    const numberOfBedrooms = parseInt(req.params.number);
    try {
        const propertiesList = await Property.find({ bedrooms: numberOfBedrooms });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No properties found with this number of bedrooms.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/status/:status - Fetch properties by status (For Rent/Sale)
export const getPropertiesByStatus = async (req, res) => {
    const status = req.params.status;
    try {
        const propertiesList = await Property.find({ status: { $regex: status, $options: 'i' } });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No properties found with this status.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET /properties/price - Fetch properties within price range
export const getPropertiesByPrice = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    try {
        const propertiesList = await Property.find({
            price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
        });
        res.status(propertiesList.length ? 200 : 404).json(propertiesList.length ? propertiesList : "No properties found in this price range.");
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// POST /properties: Add a new property
export const addProperty = async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        const savedProperty = await newProperty.save();
        res.status(201).json({
            message: "Property added successfully",
            propertyId: savedProperty._id
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};
