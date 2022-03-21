const Discord = module.require("discord.js");
const { client, interaction } = require("discord.js");
const fs = require('fs');

const run = async (client, interaction) => {
    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;
    interaction.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle(`Bot\'s Uptime`)
          .setDescription(`${days}d ${hours}h ${minutes}m ${seconds}s`)
          .setFooter({text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 "})
      ]
    })
}

module.exports = {
    name: "uptime",
    description: "This command helps you know the uptime of the bot.",
    type: "CHAT_INPUT",
    run
}