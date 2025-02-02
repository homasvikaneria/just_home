// // server.js

// const express = require('express');
// const { MongoClient } = require('mongodb');
// const propertyRoutes = require('./routes/propertyRoutes'); // Import property routes

// const app = express();
// const port = 3000;

// // MongoDB connection details
// const uri = "mongodb://127.0.0.1:27017";
// const dbName = "just_home";

// // Middleware
// app.use(express.json());

// let db;

// // Connect to MongoDB
// async function connectToDatabase() {
//     try {
//         const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("✅ Connected to MongoDB");

//         db = client.db(dbName);

//         // Make the database accessible in requests
//         app.locals.db = db;

//         // Start server after successful DB connection
//         app.listen(port, () => {
//             console.log(`🚀 Server running at http://localhost:${port}`);
//         });
//     } catch (err) {
//         console.error("❌ Error connecting to MongoDB:", err);
//         process.exit(1); // Exit if database connection fails
//     }
// }

// // Initialize Database Connection
// connectToDatabase();

// // Routes
// app.use('/properties', propertyRoutes); // All /properties routes will be handled by propertyRoutes

// // Default route
// app.get('/', (req, res) => {
//     res.send('Welcome to Just Home API 🏠');
// });

// server.js

