// just_home/Backend/Controller/PropertiesController.js
// Backend/Controller/PropertiesController.js
import {Property} from "../Model/Properties.Model.js";
// import mongoose from "mongoose";


// Create a new property
export const createProperty = async (req, res) => {
  try {
    console.log("🚀 Received Body:", req.body); // Debugging
    console.log("📂 Received Files:", req.files); // Debugging

    let {
      selectedCategory,
      category,
      selectedFeatures,
      "address.street": street,
      "address.city": city,
      "address.state": state,
      "address.country": country,
      "essentialInfo.guests": guests,
      "essentialInfo.bedrooms": bedrooms,
      "essentialInfo.bathrooms": bathrooms,
      "essentialInfo.beds": beds,
      "charmInfo.title": title,
      "charmInfo.description": description,
      "charmInfo.listingType": listingType,
      "charmInfo.price.amount": priceAmount,
      "charmInfo.price.currency": priceCurrency,
      "owner.name": ownerName,
      "owner.phone": ownerPhone,
      "owner.email": ownerEmail,
    } = req.body;

    // ✅ Convert necessary fields to numbers
    guests = Number(guests);
    bedrooms = Number(bedrooms);
    bathrooms = Number(bathrooms);
    beds = Number(beds);
    priceAmount = Number(priceAmount);

    // ✅ Parse selectedFeatures array
    selectedFeatures = selectedFeatures ? JSON.parse(selectedFeatures) : [];

    // ✅ Construct proper nested objects
    const address = { street, city, state, country };
    const essentialInfo = { guests, bedrooms, bathrooms, beds };
    const charmInfo = {
      title,
      description,
      listingType,
      price: { amount: priceAmount, currency: priceCurrency || "INR" },
    };
    const owner = { name: ownerName, phone: ownerPhone, email: ownerEmail };

    let missingFields = [];

    // ✅ Validate required fields
    if (!selectedCategory) missingFields.push("selectedCategory");
    if (!category) missingFields.push("category");
    if (!street) missingFields.push("address.street");
    if (!city) missingFields.push("address.city");
    if (!state) missingFields.push("address.state");
    if (!country) missingFields.push("address.country");
    if (!guests) missingFields.push("essentialInfo.guests");
    if (!bedrooms) missingFields.push("essentialInfo.bedrooms");
    if (!bathrooms) missingFields.push("essentialInfo.bathrooms");
    if (!beds) missingFields.push("essentialInfo.beds");
    if (!title) missingFields.push("charmInfo.title");
    if (!description) missingFields.push("charmInfo.description");
    if (!listingType) missingFields.push("charmInfo.listingType");
    if (!priceAmount) missingFields.push("charmInfo.price.amount");
    if (!ownerName) missingFields.push("owner.name");
    if (!ownerPhone) missingFields.push("owner.phone");
    if (!ownerEmail) missingFields.push("owner.email");

    if (missingFields.length > 0) {
      return res.status(400).json({ message: "Missing required fields", missingFields });
    }

    // ✅ Handle file uploads
    const photos = req.files?.map(file => `/uploads/${file.filename}`) || [];

    // ✅ Save property
    const property = new Property({
      selectedCategory,
      category,
      address,
      essentialInfo,
      selectedFeatures,
      charmInfo,
      owner,
      photos,
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error("❌ Error creating property:", error);
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
    const properties = await Property.find({ 
      "address.city": { $regex: new RegExp(city, "i") } // Case insensitive search
    });

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found in this city." });
    }

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
    console.log("🔍 Searching for listingType:", type); // Debugging log

    const properties = await Property.find({ "charmInfo.listingType": { $regex: new RegExp(type, "i") }});

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found for this listing type." });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error fetching properties by listing type:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


// Get properties by price range
export const getPropertiesByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    console.log("🔍 Min Price:", minPrice);
    console.log("🔍 Max Price:", maxPrice);

    // Ensure minPrice and maxPrice are converted to Numbers
    const filter = { "charmInfo.price.amount": {} };

    if (minPrice) filter["charmInfo.price.amount"].$gte = Number(minPrice);
    if (maxPrice) filter["charmInfo.price.amount"].$lte = Number(maxPrice);

    console.log("🛠️ Query Filter:", filter);

    const properties = await Property.find(filter);
    
    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found in this price range." });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error fetching properties by price range:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getPropertiesByBedrooms = async (req, res) => {
  try {
    const { minBedrooms, maxBedrooms } = req.query;

    if (!minBedrooms && !maxBedrooms) {
      return res.status(400).json({ message: "Please provide minBedrooms or maxBedrooms" });
    }

    // Build the filter dynamically
    let filter = {};

    if (minBedrooms) filter["essentialInfo.bedrooms"] = { $gte: Number(minBedrooms) };
    if (maxBedrooms) filter["essentialInfo.bedrooms"] = { ...filter["essentialInfo.bedrooms"], $lte: Number(maxBedrooms) };

    console.log("🛠️ Query Filter:", filter);

    const properties = await Property.find(filter);

    if (!properties.length) {
      return res.status(404).json({ message: "No properties found with the given bedroom range" });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



// Get properties by selected category
export const getPropertiesByCategory = async (req, res) => {
  try {
      const { category } = req.params;
      const properties = await Property.find({
          $or: [
              { selectedCategory: category }, // Check selectedCategory
              { category: category } // Check category
          ]
      });
      res.status(200).json(properties);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getPropertiesByMainCategory = async (req, res) => {
  try {
      const { category } = req.params;
      const properties = await Property.find({ category: category });
      res.status(200).json(properties);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Get properties by selected features
export const getPropertiesByFeatures = async (req, res) => {
  try {
    const { features } = req.query;
    
    if (!features) {
      return res.status(400).json({ message: "Features parameter is required" });
    }

    const featuresArray = features.split(",").map(f => f.trim()); // Convert string to array

    const properties = await Property.find({ selectedFeatures: { $in: featuresArray } }); // ✅ Change to $in

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found with the given features" });
    }

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
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    // If new photos are uploaded, update the photos field
    if (req.files) {
      updates.photos = req.files.map(file => `/uploads/${file.filename}`);
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProperty) return res.status(404).json({ message: "Property not found" });

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete property
import mongoose from "mongoose";

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    // ✅ Check if the property exists
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // ✅ Delete property
    await Property.findByIdAndDelete(id);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
