import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { Users } from "../Model/Users.Model.js";

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
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
        const { name, surname, email, password } = req.body;
        const profileImage = req.file;

        if (!profileImage) {
            return res.status(400).send("No file uploaded");
        }

        // Path of uploaded profile
        const profileImagePath = profileImage.path;

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            name,
            surname,
            email,
            password: hashedPassword,
            profileImagePath,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "User registration failed", error: err.message });
    }
};

// POST: User login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const userWithoutPassword = { ...user.toObject(), password: undefined };

        res.status(200).json({ token, user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
