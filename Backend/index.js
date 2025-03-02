// Backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

// Import Routes
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

// 🟢 Setup Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/"); // Ensure the folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
export const upload = multer({ storage });

// 🟢 Serve Static Files for Uploaded Images
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/contactus", ContactusRouter);
app.use("/users", UsersRouter);
app.use("/stayuptothedate", StayuptothedateRouter);
app.use("/properties", PropertiesRouter);

// 🟢 MongoDB Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas (Database: just_home)"))
.catch(err => {
    console.error("❌ MongoDB Atlas connection error:", err);
    process.exit(1); // Stop the server on failure
});

// 🟢 Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
