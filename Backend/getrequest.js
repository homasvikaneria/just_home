const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB connection details
const uri = "mongodb+srv://test:test123@cluster0.mjyfw.mongodb.net/";
const dbName = "just_home";

// Middleware
app.use(express.json());

let db, properties;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri);
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        properties = db.collection("properties");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}


// Initialize Database
initializeDatabase();

// GET /properties: Fetch all properties
app.get('/properties', async (req, res) => {
    try {
        // Fetching all properties from the database
        const propertiesList = await properties.find().toArray();  

        // If properties exist, send them as a response
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            // If no properties are found, send an appropriate response
            res.status(404).send("No properties found.");
        }
    } catch (err) {
        // Handle any errors that might occur during the query
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/city/:cityName', async (req, res) => {
    const cityName = req.params.cityName;
    try {
        const propertiesList = await properties.find({ location: { $regex: cityName, $options: 'i' } }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found in this city.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/state/:stateName', async (req, res) => {
    const stateName = req.params.stateName;
    try {
        const propertiesList = await properties.find({ state: { $regex: stateName, $options: 'i' } }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found in this state.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/category/:categoryName', async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const propertiesList = await properties.find({ category: { $regex: categoryName, $options: 'i' } }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found in this category.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/price', async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    try {
        const propertiesList = await properties.find({
            price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
        }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found in this price range.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/status/:status', async (req, res) => {
    const status = req.params.status;
    try {
        const propertiesList = await properties.find({ status: { $regex: status, $options: 'i' } }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found with this status.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/bedrooms/:number', async (req, res) => {
    const numberOfBedrooms = parseInt(req.params.number);
    try {
        const propertiesList = await properties.find({ bedrooms: numberOfBedrooms }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found with this number of bedrooms.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/petFriendly/:petFriendly', async (req, res) => {
    const petFriendly = req.params.petFriendly === 'true';
    try {
        const propertiesList = await properties.find({ petFriendly }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No pet-friendly properties found.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/landmarks/:landmark', async (req, res) => {
    const landmark = req.params.landmark;
    try {
        const propertiesList = await properties.find({ nearbyLandmarks: { $regex: landmark, $options: 'i' } }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found near this landmark.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});


app.get('/properties/rating', async (req, res) => {
    const { minRating } = req.query;
    try {
        const propertiesList = await properties.find({ overallRating: { $gte: parseFloat(minRating) } }).toArray();
        if (propertiesList.length > 0) {
            res.status(200).json(propertiesList);
        } else {
            res.status(404).send("No properties found with this rating.");
        }
    } catch (err) {
        res.status(500).send("Internal server error: " + err.message);
    }
});
