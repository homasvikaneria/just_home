// // just_home/Backend/Controller/UsersController.js
// // Backend/Controller/UsersController.js
// import fs from "fs";
// import path from "path";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import multer from "multer";
// import {Users} from "../Model/Users.Model.js";

// import { Property } from "../Model/Properties.Model.js";


// // Ensure the "uploads" directory exists
// const uploadDir = path.join("public/uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//     console.log("📂 Created missing directory: public/uploads");
// }

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname); // Unique filename
//     },
// });
// export const upload = multer({ storage });

// // GET all users
// export const getUsers = async (req, res) => {
//     try {
//         const userList = await Users.find();
//         if (userList.length > 0) {
//             res.status(200).json(userList);
//         } else {
//             res.status(404).json({ message: "No users found." });
//         }
//     } catch (err) {
//         res.status(500).json({ error: "Internal server error", details: err.message });
//     }
// };

// // GET user by email
// export const getUserByEmail = async (req, res) => {
//     try {
//         const emailId = req.params.emailId;
//         const user = await Users.findOne({ email: emailId });

//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ error: "Internal server error", details: err.message });
//     }
// };

// // POST: Add new user
// export const addUser = async (req, res) => {
//     try {
//         console.log("📸 Uploaded File:", req.file); // Debugging

//         const { name, surname, email, password } = req.body;

//         // Check if the user already exists
//         const existingUser = await Users.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash the password before storing it
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Handle profile image
//         const profileImagePath = req.file ? req.file.filename : "default.png";
//         console.log("🖼️ Profile Image Path:", profileImagePath); // Debugging

//         // Create new user
//         const newUser = new Users({
//             name,
//             surname,
//             email,
//             password: hashedPassword,
//             profileImagePath, // Stores only the filename
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully", user: newUser });
//     } catch (error) {
//         console.error("❌ Error:", error); // Debugging
//         res.status(500).json({ message: "Error registering user", error });
//     }
// };

// // POST: User login
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await Users.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         if (!process.env.JWT_SECRET) {
//             return res.status(500).json({ message: "JWT Secret not configured" });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.status(200).json({ token, user });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };


// export const updateWishlist = async (req, res) => {
//     try {
//         const { userId, propertyId } = req.params;
//         console.log("🛠 Received wishlist update request:", { userId, propertyId }); // ✅ Debugging

//         const user = await Users.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         const index = user.wishList.findIndex(id => id.toString() === propertyId);
//         if (index === -1) {
//             user.wishList.push(propertyId);
//         } else {
//             user.wishList.splice(index, 1);
//         }

//         await user.save();

//         // Return the updated wishlist
//         const updatedUser = await Users.findById(userId).populate("wishList");
//         res.status(200).json({ message: "Wishlist updated", wishList: updatedUser.wishList });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };


// export const getUserWishlist = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         console.log("🛠 Received userId:", userId); // Debugging

//         if (!userId || userId.length !== 24) { // Validate ObjectId length
//             console.log("❌ Invalid userId received:", userId);
//             return res.status(400).json({ message: "Invalid userId format" });
//         }

//         // Fix the model reference (Users instead of User)
//         const user = await Users.findById(userId).populate({
//             path: "wishList",
//             model: Property, // Ensure this matches your Property model
//         });

//         if (!user) {
//             console.log("❌ User not found:", userId);
//             return res.status(404).json({ message: "User not found", wishList: [] });
//         }

//         console.log("✅ Wishlist found:", user.wishList);
//         res.json({ wishList: user.wishList || [] });

//     } catch (error) {
//         console.error("❌ Error fetching wishlist:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };

// export const removeFromWishlist = async (req, res) => {
//     const { userId, propertyId } = req.params;

//     try {
//         const user = await Users.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         // ✅ Remove property from wishlist
//         user.wishList = user.wishList.filter(id => id.toString() !== propertyId);
//         await user.save();

//         res.json({ message: "Property removed from wishlist", wishList: user.wishList });
//     } catch (error) {
//         console.error("❌ Remove Wishlist Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };




// export const getWishlist = async (req, res) => {
//     try {
//       const user = await Users.findById(req.params.userId).populate("wishList");
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.json({ wishList: user.wishList });
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };

//   export const updateUserProfile = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { name, surname, email, password } = req.body;
//         let updateData = { name, surname, email };

//         // Hash new password if provided
//         if (password) {
//             const salt = await bcrypt.genSalt(10);
//             updateData.password = await bcrypt.hash(password, salt);
//         }

//         // Handle profile image update
//         if (req.file) {
//             updateData.profileImagePath = req.file.filename;
//         }

//         const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
//     } catch (error) {
//         console.error("Profile update error:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// export const toggleWishlist = async (req, res) => {
//     const { userId, propertyId } = req.params;

//     try {
//         const user = await Users.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const index = user.wishList.indexOf(propertyId);
//         if (index === -1) {
//             // ✅ Add property to wishlist
//             user.wishList.push(propertyId);
//             await user.save();
//             return res.json({ message: "Property added to wishlist", wishList: user.wishList });
//         } else {
//             // ✅ Confirm before removing
//             return res.json({ message: "Confirm removal", confirm: true });
//         }
//     } catch (error) {
//         console.error("❌ Wishlist Toggle Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };



import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { Users } from "../Model/Users.Model.js";
import { Property } from "../Model/Properties.Model.js";

// Ensure "uploads" directory exists
const uploadDir = path.join("public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📂 Created missing directory: public/uploads");
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
export const upload = multer({ storage });

// GET all users
export const getUsers = async (req, res) => {
    try {
        const userList = await Users.find();
        res.status(userList.length ? 200 : 404).json(userList.length ? userList : { message: "No users found." });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// GET user by email
export const getUserByEmail = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.params.emailId });
        if (!user) return res.status(404).json({ message: "User not found." });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// POST: Add new user
export const addUser = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        const existingUser = await Users.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const profileImagePath = req.file ? req.file.filename : "default.png";

        const newUser = new Users({ name, surname, email, password: hashedPassword, profileImagePath });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// POST: User login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT Secret not configured" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PATCH: Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, surname, email, password } = req.body;
        let updateData = { name, surname, email };

        if (password) updateData.password = await bcrypt.hash(password, 10);
        if (req.file) updateData.profileImagePath = req.file.filename;

        const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) return res.status(404).json({ message: "User not found." });

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Wishlist Operations

// GET: Get user wishlist
export const getUserWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId || userId.length !== 24) return res.status(400).json({ message: "Invalid userId format" });

        const user = await Users.findById(userId).populate({ path: "wishList", model: Property });

        if (!user) return res.status(404).json({ message: "User not found", wishList: [] });

        res.json({ wishList: user.wishList || [] });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// PATCH: Update wishlist (add/remove property)
export const updateWishlist = async (req, res) => {
    try {
        const { userId, propertyId } = req.params;
        const user = await Users.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found." });

        const index = user.wishList.indexOf(propertyId);
        if (index === -1) {
            user.wishList.push(propertyId);
        } else {
            user.wishList.splice(index, 1);
        }

        await user.save();
        const updatedUser = await Users.findById(userId).populate("wishList");
        res.status(200).json({ message: "Wishlist updated", wishList: updatedUser.wishList });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE: Remove property from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { userId, propertyId } = req.params;
        const user = await Users.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.wishList = user.wishList.filter(id => id.toString() !== propertyId);
        await user.save();

        res.json({ message: "Property removed from wishlist", wishList: user.wishList });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET: Get wishlist (Alternative)
export const getWishlist = async (req, res) => {
    try {
        const user = await Users.findById(req.params.userId).populate("wishList");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ wishList: user.wishList });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// Add this to your Backend/Controller/UsersController.js file

// POST: Add property to wishlist
export const addToWishlist = async (req, res) => {
    try {
      const { userId, propertyId } = req.params;
      const user = await Users.findById(userId);
  
      if (!user) return res.status(404).json({ message: "User not found." });
  
      // Check if property is already in wishlist
      if (!user.wishList.includes(propertyId)) {
        user.wishList.push(propertyId);
        await user.save();
      }
  
      res.status(200).json({ message: "Property added to wishlist", wishList: user.wishList });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // Then update your UsersRouter.js to include this new route:
  // Add this to your UsersRouter in Backend/Routes/UsersRouter.js
  // UsersRouter.post("/:userId/wishlist/:propertyId", addToWishlist);