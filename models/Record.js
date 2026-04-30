const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    note: String,

    // 🔥 NEW FIELD (IMPORTANT)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    isDeleted: {
    type: Boolean,
    default: false
}
});

module.exports = mongoose.model("Record", recordSchema);