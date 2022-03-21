const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    try {
        let member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                (x) => x.user.username.toLowerCase() === args[0]
            ) ||
            message.member;
        let rolesname;
        let roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((role) => role.toString())
            .slice(0, -1);

        rolesname = roles.join(" | ");
        if (member.roles.cache.size < 1) rolesname = "No Roles";
        if (!member.roles.cache.size || member.roles.cache.size - 1 < 1)
            roles = `\`None\``;
        let botuser;
        if (member.user.bot === false) {
            botuser = "No";
        } else {
            botuser = "Yes";
        }

        let userstatus;
        if (!member.presence?.status) {
            userstatus = "Offline";
        } else {
            userstatus = member.presence?.status;
        }

        let status;
        if (member.presence === null) {
            status = "None";
        } else {
            if (member.presence.activities[0] == null) {
                status = "None";
            } else {
                status = member.presence.activities[0].state;
            }
        }

        if (status == null) {
            status = "None";
        }

        const person = bot.users.cache
            .find((user) => (user.id = message.id.toString()))
            .toString();
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setDescription(
                        `${member}` +
                            "\n\n**General**\n> <:dot:948182294450016286> `-` User - " +
                            member.user.username +
                            "\n> <:dot:948182294450016286> `-` Discriminator - " +
                            member.user.discriminator +
                            "\n> <:dot:948182294450016286> `-` ID - " +
                            member.id +
                            "\n> <:dot:948182294450016286> `-` Bot - " +
                            botuser +
                            "\n> <:dot:948182294450016286> `-` Roles - " +
                            roles.length +
                            "\n> <:dot:948182294450016286> `-` Created - " +
                            member.user.createdAt.toLocaleDateString("en-gb", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                            }) +
                            "\n> <:dot:948182294450016286> `-` Joined - " +
                            member.joinedAt.toLocaleDateString("en-gb", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                            }) +
                            "\n\n**Presence**\n> <:dot:948182294450016286> `-` Status - " +
                            userstatus.toUpperCase() +
                            "\n> <:dot:948182294450016286> `-` Custom Status - " +
                            status +
                            "\n\n**Roles**\n" +
                            `${rolesname || `\`That user has no roles\``}`
                    )
                    .setAuthor({
                        name: member.user.tag,
                        iconURL: member.user.avatarURL({
                            dynamic: true,
                            size: 512,
                        }),
                    })
                    .setThumbnail(
                        member.user.avatarURL({ dynamic: true, size: 512 })
                    )
                    .setFooter({ text: `© Programmers Hub Bot` }),
            ],
        });
    } catch (e) {
        console.log(e.stack);
    }
};

module.exports.help = {
    name: "whois",
    desc: "This command helps you get details of a user.",
};
