const Discord = module.require("discord.js");
const { client, interaction } = require("discord.js");
const fs = require('fs');

const run = async (client, interaction) => {
    const owner = client.users.cache.find(user => user.id = interaction.guild.ownerId.toString()).toString();
    const announcementchannel = interaction.guild.channels.cache.filter(c => c.type === "GUILD_NEWS").size;
    const textchannel = interaction.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size + announcementchannel;
    const stagechannel = interaction.guild.channels.cache.filter(c => c.type === "GUILD_STAGE_VOICE").size;
    const voicechannel = interaction.guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size + stagechannel;
    const categorycount = interaction.guild.channels.cache.filter(ch => ch.type === 'GUILD_CATEGORY').size
    interaction.reply({
        embeds: [
            new Discord.MessageEmbed()
                .setColor("0x2F3136")
                .setThumbnail(interaction.guild.iconURL())
                .setAuthor({ name: 'Server Information', iconURL: interaction.guild.iconURL() })
                .addFields(
                    {
                        name: 'Owner',
                        value: owner,
                        inline: true,
                    },
                    {
                        name: 'Category Channels',
                        value: categorycount.toString(),
                        inline: true,
                    },
                    {
                        name: 'Text Channels',
                        value: textchannel.toString(),
                        inline: true,
                    },
                    {
                        name: 'Voice Channels',
                        value: voicechannel.toString(),
                        inline: true,
                    },
                    {
                        name: 'Members',
                        value: interaction.guild.memberCount.toString(),
                        inline: true,
                    },
                    {
                        name: 'Roles',
                        value: interaction.guild.roles.cache.size.toString(),
                        inline: true,
                    }
                )
                .setFooter({ text: "ID: " + interaction.guild.id + " | Server Created • " + interaction.guild.createdAt.toLocaleDateString('en-gb', { year: "numeric", month: "2-digit", day: "2-digit" }) })
        ]
    })
}

module.exports = {
    name: "serverinfo",
    description: "This command helps you get information of the server.",
    type: "CHAT_INPUT",
    run
}