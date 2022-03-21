const Discord = module.require("discord.js");
const { client, interaction } = require("discord.js");

const run = async (client, interaction) => {
    interaction.reply({
        embeds: [
            new Discord.MessageEmbed()
                .setTitle(`Bot\'s Prefix`)
                .setDescription("pro!")
                .setFooter({text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 "})
        ]
    })
}

module.exports = {
    name: "prefix",
    description: "This command helps you know the prefix of the bot.",
    type: "CHAT_INPUT",
    run
}