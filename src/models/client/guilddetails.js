const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    server: {
        type: String,
        required: true,
    },
    members: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    textchannels: {
        type: String,
        required: true,
    },
    voicechannels: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("guild", schema);

const Guild = (module.exports = mongoose.model("guild", schema));