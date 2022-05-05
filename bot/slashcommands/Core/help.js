const Discord = module.require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } =
    module.require("discord.js");
const { readdirSync } = require("fs");

const run = async (client, interaction) => {
    let cmdinfo = interaction.options.getString("command");
    try {
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
                    .setLabel("Core 💻")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId("botmisc")
                    .setLabel("Miscellaneous 💿")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId("botmod")
                    .setLabel("Moderation 🛠")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId("botmusic")
                    .setLabel("Music 🎵")
                    .setStyle("SUCCESS")
            );
            let core = [],
                music = [],
                moderation = [],
                misc = [],
                cats = [];

            readdirSync("./bot/commands/").forEach((dirs) => {
                const commands = readdirSync(`./bot/commands/${dirs}`).filter(
                    (files) => files.endsWith(".js")
                );
                cats.push(
                    "> <:dot:948182294450016286> `" + dirs + " Commands`"
                );
                for (const file of commands) {
                    const command = require(`../../commands/${dirs}/${file}`);
                    if (dirs == "Core") {
                        core.push(
                            "> <:dot:948182294450016286> `" +
                                command.help.name.toLowerCase() +
                                "`"
                        );
                    }
                    if (dirs == "Moderation") {
                        moderation.push(
                            "> <:dot2:949259396175765524> `" +
                                command.help.name.toLowerCase() +
                                "`"
                        );
                    }
                    if (dirs == "Miscellaneous") {
                        misc.push(
                            "> <:dot:957663246507196456> `" +
                                command.help.name.toLowerCase() +
                                "`"
                        );
                    }
                    if (dirs == "Music") {
                        music.push(
                            "> <:dot3:953152539430387805> `" +
                                command.help.name.toLowerCase() +
                                "`"
                        );
                    }
                }
            });

            const embed = new MessageEmbed()
                .setTitle("Bot Help Panel")
                .setColor("#000")
                .setDescription(
                    "A bot for Programmer's Hub Discord Community.\n\n> Use the Buttons below to control the help panel.\n> Do pro!help {command_name} for command information.\n\n" +
                        `${cats.join("\n")}`
                )
                .setFooter({
                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                })
                .setThumbnail(client.user.displayAvatarURL());

            const embed2 = new MessageEmbed()
                .setTitle("Core Commands 💻")
                .setColor("#000")
                .setDescription(`${core.join("\n")}`)
                .setFooter({
                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                })
                .setThumbnail(client.user.displayAvatarURL());

            const embed3 = new MessageEmbed()
                .setTitle("Music Commands 🎵")
                .setColor("#000")
                .setDescription(`${music.join("\n")}`)
                .setFooter({
                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                })
                .setThumbnail(client.user.displayAvatarURL());

            const embed4 = new MessageEmbed()
                .setTitle("Moderation Commands 🛠")
                .setColor("#000")
                .setDescription(`${moderation.join("\n")}`)
                .setFooter({
                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                })
                .setThumbnail(client.user.displayAvatarURL());

            const embed5 = new MessageEmbed()
                .setTitle("Miscellaneous Commands 💿")
                .setColor("#000")
                .setDescription(`${misc.join("\n")}`)
                .setFooter({
                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                })
                .setThumbnail(client.user.displayAvatarURL());

            interaction.reply({
                embeds: [embed],
                components: [row],
            });

            const filter = (message) => {
                if (interaction.user.id === interaction.user.id) return true;
                return interaction.reply({
                    content: "You can't use this button.",
                    ephemeral: true,
                });
            };

            const collector =
                interaction.channel.createMessageComponentCollector({
                    filter,
                    time: 1000 * 60,
                });

            collector.on("collect", async (ButtonInteraction) => {
                const id = ButtonInteraction.customId;
                if (id === "home")
                    return ButtonInteraction.update({
                        embeds: [embed],
                        components: [row],
                    });
                if (id === "botinfo")
                    return ButtonInteraction.update({
                        embeds: [embed2],
                        components: [row],
                    });
                if (id === "botmusic")
                    return ButtonInteraction.update({
                        embeds: [embed3],
                        components: [row],
                    });
                if (id === "botmod")
                    return ButtonInteraction.update({
                        embeds: [embed4],
                        components: [row],
                    });
                if (id === "botmisc")
                    return ButtonInteraction.update({
                        embeds: [embed5],
                        components: [row],
                    });
            });
        } else if (cmdinfo) {
            readdirSync("./bot/commands/").forEach((dirs) => {
                const commands = readdirSync(`./bot/commands/${dirs}`).filter(
                    (files) => files.endsWith(".js")
                );
                for (const file of commands) {
                    const command = require(`../../commands/${dirs}/${file}`);
                    if (command.help.name.toLowerCase() == cmdinfo) {
                        let commandembed = executehelpconditions(command);
                        interaction.reply({
                            embeds: [commandembed],
                        });
                        invalidcom = false;
                        break;
                    }
                    if (command.help.aliases) {
                        command.help.aliases.forEach((alias) => {
                            if (alias == cmdinfo) {
                                let commandembed =
                                    executehelpconditions(command);
                                interaction.reply({
                                    embeds: [commandembed],
                                });
                                invalidcom = false;
                            }
                        });
                    }
                }
            });
            if (invalidcom == true) {
                interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setTitle(`Invalid Command`)
                            .setDescription(">>> Invalid command provided."),
                    ],
                });
            }
        }
    } catch (e) {
        console.log(e.stack);
    }
};

function capcom(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function executehelpconditions(command) {
    let cmd = command.help.name.toLowerCase();
    let cmdalias = false;
    commandembed = new Discord.MessageEmbed()
        .setTitle(capcom(cmd) + ` Command.`)
        .setDescription(command.help.desc)
        .addFields({
            name: "Command:",
            value: "> " + cmd,
        });
    if (command.help.aliases) {
        cmdalias = [];
        command.help.aliases.forEach((alias) => {
            cmdalias.push(alias);
        });
    }
    if (!cmdalias === false) {
        commandembed.addFields({
            name: "Alias",
            value: "> " + cmdalias.join(", "),
        });
    }
    return commandembed;
}

module.exports = {
    name: "help",
    description: "This command helps you know the commands of the bot.",
    type: "CHAT_INPUT",
    options: [
        {
            name: "command",
            description: "For command information",
            type: "STRING",
            required: false,
        },
    ],
    run,
};
