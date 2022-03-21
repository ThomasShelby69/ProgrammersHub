const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    try {
        const wsping = Math.round(bot.ws.ping);
        const ping = Date.now() - message.createdTimestamp;
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Pong :ping_pong:`)
                    .addFields(
                        {
                            name: "Websocket Latency:",
                            value: ">>> " + wsping.toString() + "ms",
                        },
                        {
                            name: "Message Latency:",
                            value: ">>> " + ping.toString() + "ms",
                        }
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
    name: "ping",
    desc: "This command helps you know the ping of the bot.",
};
