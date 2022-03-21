const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
    server: { type: String, required: true },
});

const BotinGuild = (module.exports = mongoose.model("guilds", GuildSchema));
