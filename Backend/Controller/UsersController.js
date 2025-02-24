// Backend/Controller/UsersController.js
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { Users } from "../Model/Users.Model.js";

// Ensure the "uploads" directory exists
const uploadDir = path.join("public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📂 Created missing directory: public/uploads");
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
export const upload = multer({ storage });

// GET all users
export const getUsers = async (req, res) => {
    try {
        const userList = await Users.find();
        if (userList.length > 0) {
            res.status(200).json(userList);
        } else {
            res.status(404).json({ message: "No users found." });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET user by email
export const getUserByEmail = async (req, res) => {
    try {
        const emailId = req.params.emailId;
        const user = await Users.findOne({ email: emailId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// POST: Add new user
export const addUser = async (req, res) => {
    try {
        console.log("📸 Uploaded File:", req.file); // Debugging

        const { name, surname, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Handle profile image
        const profileImagePath = req.file ? req.file.filename : "default.png";
        console.log("🖼️ Profile Image Path:", profileImagePath); // Debugging

        // Create new user
        const newUser = new Users({
            name,
            surname,
            email,
            password: hashedPassword,
            profileImagePath, // Stores only the filename
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("❌ Error:", error); // Debugging
        res.status(500).json({ message: "Error registering user", error });
    }
};

// POST: User login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT Secret not configured" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
