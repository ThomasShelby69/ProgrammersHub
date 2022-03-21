const Discord = module.require("discord.js");
const { client, interaction } = require("discord.js");
const fs = require('fs');
const { MessageEmbed, MessageActionRow, MessageButton } = module.require("discord.js");

const run = async (client, interaction) => {
    let cmdinfo = interaction.options.getString("command")
    if (!cmdinfo) {
        const { guild } = interaction;
        const { name } = guild;
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("home")
                .setLabel("Home")
                .setStyle("DANGER"),
            new MessageButton()
                .setCustomId("botinfo")
                .setLabel("Info 💻")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("botmusic")
                .setLabel("Music 🎵")
                .setStyle("SUCCESS")
        );
        const embed = new MessageEmbed()
            .setTitle("Bot Help Panel")
            .setColor("#000")
            .setDescription("A bot for Programmer's Hub Discord Community.\n\n> Use the Buttons below to control the help panel.\n> Do pro!help {command_name} for command information.\n> \n>>> <:dot:948182294450016286> `Information Commands` \n<:dot:948182294450016286> `Music Commands`")
            .setFooter({text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 "})
            .setThumbnail(client.user.displayAvatarURL())

        const embed2 = new MessageEmbed()
            .setTitle("Information Commands 💻")
            .setColor("#000")
            .setDescription("> <:dot:948182294450016286> `botinfo`\n > <:dot:948182294450016286> `serverinfo`\n > <:dot:948182294450016286> `whois`\n > <:dot:948182294450016286> `help`\n> <:dot:948182294450016286> `prefix`\n> <:dot:948182294450016286> `ping`\n> <:dot:948182294450016286> `uptime`")
            .setFooter({text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 "})
            .setThumbnail(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())

        const embed3 = new MessageEmbed()
            .setTitle("Music Commands 🎵")
            .setColor("#000")
            .setDescription("> <:dot2:949259396175765524> `back`\n > <:dot2:949259396175765524> `clear`\n > <:dot2:949259396175765524> `filter`\n > <:dot2:949259396175765524> `loop`\n> <:dot2:949259396175765524> `nowplaying`\n> <:dot2:949259396175765524> `pause`\n> <:dot2:949259396175765524> `play`\n> <:dot2:949259396175765524> `progress`\n> <:dot2:949259396175765524> `queue`\n> <:dot2:949259396175765524> `resume`\n> <:dot2:949259396175765524> `save`\n> <:dot2:949259396175765524> `search`\n> <:dot2:949259396175765524> `skip`\n> <:dot2:949259396175765524> `stop`\n> <:dot2:949259396175765524> `volume`")
            .setFooter({text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 "})
            .setThumbnail(client.user.displayAvatarURL())

        interaction.reply({
            embeds: [embed],
            components: [row]
        });

        const filter = (message) => {
            if (interaction.user.id === interaction.user.id) return true;
            return interaction.reply({
                content: "You can't use this button.",
                ephemeral: true
            });
        }

        const collector = interaction.channel.createMessageComponentCollector({
            filter, time: 1000 * 60
        });

        collector.on("collect", async (ButtonInteraction) => {
            const id = ButtonInteraction.customId;
            if (id === 'home') return ButtonInteraction.update({
                embeds: [embed],
                components: [row]
            })
            if (id === 'botinfo') return ButtonInteraction.update({
                embeds: [embed2],
                components: [row]
            })
            if (id === 'botmusic') return ButtonInteraction.update({
                embeds: [embed3],
                components: [row]
            })
        });
    }
    else if (cmdinfo == "botinfo") {
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Botinfo Command`)
                    .setDescription("This command helps you get all stats of bot.")
                    .addFields(
                        {
                            name: 'Command:',
                            value: ">>> botinfo",
                        },
                        {
                            name: 'Alias',
                            value: '>>> stats',
                        }
                    )
            ]
        })
    }
    else if (cmdinfo == "serverinfo") {
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Serverinfo Command`)
                    .setDescription("This command helps you get information of the server.")
                    .addFields(
                        {
                            name: 'Command:',
                            value: ">>> serverinfo",
                        }
                    )
            ]
        })
    }
    else if (cmdinfo == "whois") {
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Whois Command`)
                    .setDescription("This command helps you get details of a user.")
                    .addFields(
                        {
                            name: 'Command:',
                            value: ">>> whois",
                        }
                    )
            ]
        })
    }
    else if (cmdinfo == "help") {
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Help Command`)
                    .setDescription("This command helps you get commands of the bot.")
                    .addFields(
                        {
                            name: 'Command:',
                            value: ">>> help",
                        },
                        {
                            name: 'Alias',
                            value: '>>> commands, cmds',
                        }
                    )
            ]
        })
    }
    else if (cmdinfo == "prefix") {
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Prefix Command`)
                    .setDescription("This command helps you know the prefix of the bot.")
                    .addFields(
                        {
                            name: 'Command:',
                            value: ">>> prefix",
                        }
                    )
            ]
        })
    }
    else if (cmdinfo == "ping") {
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Ping Command`)
                    .setDescription("This command helps you know the ping of the bot.")
                    .addFields(
                        {
                            name: 'Command:',
                            value: ">>> ping",
                        }
                    )
            ]
        })
    }
    else if (cmdinfo == "uptime") {
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Uptime Command`)
                    .setDescription("This command helps you know the uptime of the bot.")
                    .addFields(
                        {
                            name: 'Command:',
                            value: ">>> ping",
                        }
                    )
            ]
        })
    }else{
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Invalid Command`)
                    .setDescription(">>> Invalid command provided.")
            ]
        })
    }
}

module.exports = {
    name: "help",
    description: "This command helps you know the commands of the bot.",
    type: "CHAT_INPUT",
    options: [
        {
            name: "command", description: "For command information",
            type: "STRING", required: false
        }],
    run
}