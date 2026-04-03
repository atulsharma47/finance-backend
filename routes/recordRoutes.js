const express = require("express");
const router = express.Router();

const Record = require("../models/Record");
const auth = require("../middleware/auth");


// CREATE RECORD (Admin)
router.post("/", auth(["admin"]), async (req, res) => {
    try {
        const { amount, type, category, note } = req.body;

        if (!amount || !type || !category) {
            return res.status(400).json({ message: "Amount, type, and category are required" });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({ message: "Type must be income or expense" });
        }

        const record = await Record.create({
            amount,
            type,
            category,
            note,
            user: req.user._id
        });

        res.status(201).json(record);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// GET RECORDS (FILTER + SEARCH + PAGINATION + SOFT DELETE 🔥)
router.get("/", auth(["admin", "analyst"]), async (req, res) => {
    try {
        const {
            type,
            category,
            startDate,
            endDate,
            page = 1,
            limit = 5,
            search
        } = req.query;

        let filter = {
            user: req.user._id,
            isDeleted: false   // 🔥 exclude deleted
        };

        if (type) filter.type = type;
        if (category) filter.category = category;

        // 🔍 SEARCH
        if (search) {
            filter.$or = [
                { category: { $regex: search, $options: "i" } },
                { note: { $regex: search, $options: "i" } }
            ];
        }

        // date filter
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const records = await Record.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(records);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// UPDATE RECORD
router.put("/:id", auth(["admin"]), async (req, res) => {
    try {
        const updated = await Record.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id, isDeleted: false },
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// SOFT DELETE RECORD 🔥
router.delete("/:id", auth(["admin"]), async (req, res) => {
    try {
        await Record.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { isDeleted: true }
        );

        res.json({ message: "Record deleted (soft)" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// DASHBOARD SUMMARY
router.get("/summary", auth(["admin", "analyst"]), async (req, res) => {
    try {
        const records = await Record.find({
            user: req.user._id,
            isDeleted: false
        });

        let income = 0;
        let expense = 0;
        let categoryTotals = {};

        records.forEach(r => {
            if (r.type === "income") income += r.amount;
            else expense += r.amount;

            if (!categoryTotals[r.category]) {
                categoryTotals[r.category] = 0;
            }

            categoryTotals[r.category] += r.amount;
        });

        const recent = await Record.find({
            user: req.user._id,
            isDeleted: false
        })
            .sort({ date: -1 })
            .limit(5);

        res.json({
            totalIncome: income,
            totalExpense: expense,
            balance: income - expense,
            categoryTotals,
            recentActivity: recent
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// MONTHLY TRENDS
router.get("/trends", auth(["admin", "analyst"]), async (req, res) => {
    try {
        const records = await Record.find({
            user: req.user._id,
            isDeleted: false
        });

        let monthlyData = {};

        records.forEach(r => {
            const month = new Date(r.date).toISOString().slice(0, 7);

            if (!monthlyData[month]) {
                monthlyData[month] = { income: 0, expense: 0 };
            }

            if (r.type === "income") {
                monthlyData[month].income += r.amount;
            } else {
                monthlyData[month].expense += r.amount;
            }
        });

        const result = Object.keys(monthlyData).map(month => ({
            month,
            income: monthlyData[month].income,
            expense: monthlyData[month].expense
        }));

        res.json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;