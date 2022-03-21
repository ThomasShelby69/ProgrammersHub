const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    server: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("guild", schema);
