const Discord = module.require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const prefixschema = require("../db/prefix-schema");

const run = async (client, interaction) => {
    let setnew = interaction.options.getString("set");
    let prefixco = await prefixschema
        .find({ onSale: 1, server: interaction.guild.id }, "server prefix")
        .sort({ value: 1 });
    let prefix;
    if (!prefixco[0]) {
        prefix = "pro!";
    } else {
        prefix = prefixco[0].prefix;
    }
    interaction.reply({
        embeds: [
            new Discord.MessageEmbed()
                .setTitle(`Bot\'s Prefix`)
                .setDescription(`${prefix}`)
                .setFooter({text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 "})
        ]
    })
}

module.exports = {
    name: "prefix",
    description: "This command helps you know the prefix of the bot.",
    type: "CHAT_INPUT",
    options: [
        {
            name: "set",
            description: "Set New Prefix",
            type: "STRING",
            required: false,
        },
    ],
    run
}