const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// CREATE a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// UPDATE user by ID
exports.updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true
        }).select("-password");

        if (!updated) return res.status(404).json({ message: "User not found" });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// DELETE user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
