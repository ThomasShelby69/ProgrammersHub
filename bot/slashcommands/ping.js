const Discord = module.require("discord.js");
const { client, interaction } = require("discord.js");

const run = async (client, interaction) => {
    const wsping = Math.round(client.ws.ping);
    const ping = Date.now() - interaction.createdTimestamp;
    interaction.reply({
        embeds: [
            new Discord.MessageEmbed()
                .setTitle(`Pong :ping_pong:`)
                .addFields(
                    {
                        name: "Websocket Ping:",
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
};

module.exports = {
    name: "ping",
    description: "This command helps you know the ping of the bot.",
    type: "CHAT_INPUT",
    run,
};
