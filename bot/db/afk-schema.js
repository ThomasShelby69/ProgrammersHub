const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    server: {
        type: String,
        required: true,
    },
    member: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("usersafk", schema);
