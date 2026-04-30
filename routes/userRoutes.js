const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// CREATE USER
router.post("/", async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email required" });
        }

        const user = await User.create({
            name,
            email,
            role
        });

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 🔥 LOGIN USER (THIS WAS MISSING)
router.post("/login", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "secretkey",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// GET ALL USERS
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// UPDATE USER
router.put("/:id", async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// CHANGE USER STATUS
router.patch("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;