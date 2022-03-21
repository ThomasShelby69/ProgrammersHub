const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    try {
        const days = Math.floor(bot.uptime / 86400000);
        const hours = Math.floor(bot.uptime / 3600000) % 24;
        const minutes = Math.floor(bot.uptime / 60000) % 60;
        const seconds = Math.floor(bot.uptime / 1000) % 60;
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Bot\'s Uptime`)
                    .setDescription(
                        `${days}d ${hours}h ${minutes}m ${seconds}s`
                    )
                    .setFooter({
                        text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                    }),
            ],
        });
    } catch (e) {
        console.log(e.stack);
    }
};

module.exports.help = {
    name: "uptime",
    desc: "This command helps you know the uptime of the bot.",
};
