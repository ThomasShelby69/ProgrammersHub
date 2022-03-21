const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    try {
        const owner = bot.users.cache
            .find((user) => (user.id = message.guild.ownerId.toString()))
            .toString();
        const announcementchannel = message.guild.channels.cache.filter(
            (c) => c.type === "GUILD_NEWS"
        ).size;
        const textchannel =
            message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT")
                .size + announcementchannel;
        const stagechannel = message.guild.channels.cache.filter(
            (c) => c.type === "GUILD_STAGE_VOICE"
        ).size;
        const voicechannel =
            message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE")
                .size + stagechannel;
        const categorycount = message.guild.channels.cache.filter(
            (ch) => ch.type === "GUILD_CATEGORY"
        ).size;
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("0x2F3136")
                    .setThumbnail(message.guild.iconURL())
                    .setAuthor({
                        name: "Server Information",
                        iconURL: message.guild.iconURL(),
                    })
                    .addFields(
                        {
                            name: "Owner",
                            value: owner,
                            inline: true,
                        },
                        {
                            name: "Category Channels",
                            value: categorycount.toString(),
                            inline: true,
                        },
                        {
                            name: "Text Channels",
                            value: textchannel.toString(),
                            inline: true,
                        },
                        {
                            name: "Voice Channels",
                            value: voicechannel.toString(),
                            inline: true,
                        },
                        {
                            name: "Members",
                            value: message.guild.memberCount.toString(),
                            inline: true,
                        },
                        {
                            name: "Roles",
                            value: message.guild.roles.cache.size.toString(),
                            inline: true,
                        }
                    )
                    .setFooter({
                        text:
                            "ID: " +
                            message.guild.id +
                            " | Server Created • " +
                            message.guild.createdAt.toLocaleDateString(
                                "en-gb",
                                {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }
                            ),
                    }),
            ],
        });
    } catch (e) {
        console.log(e.stack);
    }
};

module.exports.help = {
    name: "serverinfo",
    desc: "This command helps you get information of the server.",
};
