const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB connection details
const uri = "mongodb://127.0.0.1:27017";
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
