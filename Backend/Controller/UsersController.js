import { Users } from '../Model/Users.Model.js';

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
        const newUser = new Users(req.body);
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User added successfully",
            userId: savedUser._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};
