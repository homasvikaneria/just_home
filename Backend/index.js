// just_home/Backend/index.js
// Backend/index.js
// index.js



import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


import ContactusRouter from './Routes/ContactusRouter.js';
import UsersRouter from './Routes/UsersRouter.js';
import StayuptothedateRouter from './Routes/StayuptothedateRouter.js';
import PropertiesRouter from './Routes/PropertiesRouter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file!");
    process.exit(1); // Stop the server if MongoDB URI is missing
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/contactus", ContactusRouter);
app.use("/users", UsersRouter);
app.use ("/stayuptothedate" , StayuptothedateRouter)
app.use("/properties",PropertiesRouter)

// MongoDB Atlas Connection
// mongoose.connect(MONGO_URI)
//     .then(() => console.log("✅ Connected to MongoDB Atlas (Database: just_home)"))
//     .catch(err => console.error("❌ MongoDB Atlas connection error:", err));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas (Database: just_home)"))
.catch(err => {
    console.error("❌ MongoDB Atlas connection error:", err);
    process.exit(1); // Stop the server on failure
});


// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


