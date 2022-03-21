const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    server: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("prefix", schema);
