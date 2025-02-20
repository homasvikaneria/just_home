


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import ContactusRouter from './Routes/ContactusRouter.js';
// import UsersRouter from './Routes/UsersRouter.js';

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
// app.use("/users", UsersRouter);

// MongoDB Atlas Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas (Database: just_home)"))
    .catch(err => console.error("❌ MongoDB Atlas connection error:", err));

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// import express from 'express';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//     res.send("Server is running...");
// });

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
