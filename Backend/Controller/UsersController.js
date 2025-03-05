// just_home/Backend/Controller/UsersController.js
// Backend/Controller/UsersController.js
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { Users } from "../Model/Users.Model.js";
import { Property } from "../Model/Properties.Model.js";


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


export const updateWishlist = async (req, res) => {
    try {
        const { userId, propertyId } = req.params;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const index = user.wishList.findIndex(id => id.toString() === propertyId);
        if (index === -1) {
            user.wishList.push(propertyId);
        } else {
            user.wishList.splice(index, 1);
        }

        await user.save();

        // Return the updated wishlist
        const updatedUser = await Users.findById(userId).populate("wishList");
        res.status(200).json({ message: "Wishlist updated", wishList: updatedUser.wishList });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getUserWishlist = async (req, res) => {
    const { userId } = req.params;
    console.log("🔍 Fetching wishlist for user:", userId); // Debugging

    try {
        const user = await Users.findById(userId).populate({
            path: "wishList",
            select: "title price location coverimg propertyType status description",
        });

        if (!user) {
            console.log("❌ User not found.");
            return res.status(404).json({ wishList: [] });
        }

        console.log("✅ User wishlist:", user.wishList);
        res.status(200).json({ wishList: user.wishList || [] });
    } catch (error) {
        console.error("❌ Error fetching wishlist:", error);
        res.status(500).json({ message: "Error fetching wishlist", wishList: [] });
    }
};


export const removeFromWishlist = async (req, res) => {
    try {
        const { userId, propertyId } = req.params;

        // Find the user
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Remove property from wishlist
        user.wishList = user.wishList.filter(id => id.toString() !== propertyId);

        // Save updated user data
        await user.save();

        res.status(200).json({ message: "Property removed from wishlist", wishList: user.wishList });
    } catch (error) {
        res.status(500).json({ message: "Error removing from wishlist", error: error.message });
    }
};


export const getWishlist = async (req, res) => {
    try {
      const user = await Users.findById(req.params.userId).populate("wishList");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ wishList: user.wishList });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, surname, email, password } = req.body;
        let updateData = { name, surname, email };

        // Hash new password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Handle profile image update
        if (req.file) {
            updateData.profileImagePath = req.file.filename;
        }

        const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
