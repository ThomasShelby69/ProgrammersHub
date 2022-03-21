const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "save",
    voiceChannel: true,

    async run(client, message) {
        const embedsend = new MessageEmbed();
        embedsend.setColor("BLACK");
        embedsend.setTimestamp();
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            embedsend.setDescription(`No music currently playing! ❌`);
            return message.reply({ embeds: [embedsend] });
        }

        const embed = new MessageEmbed();
        embed.setColor("BLACK");
        embed.setThumbnail(
            message.guild.iconURL({ size: 2048, dynamic: true })
        );
        embed.setTitle(`Music Saved`);
        embed.setDescription(
            `Registered track: **${queue.current.title}** | ${queue.current.author}\n\n Saved server: **${message.guild.name}** ✅`
        );
        embed.setTimestamp();
        embed.setFooter(
            "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969",
            message.author.avatarURL({ dynamic: true })
        );

        message.author
            .send({ embeds: [embed] })
            .then(() => {
                embedsend.setDescription(
                    `I sent the name of the music via private message. ✅`
                );
                return message.reply({ embeds: [embedsend] });
            })
            .catch((error) => {
                embedsend.setDescription(
                    `Unable to send you private message. ❌`
                );
                return message.reply({ embeds: [embedsend] });
            });
    },
};

module.exports.help = {
    name: "save",
    desc: "Saves the information about the current music to your dms!",
};
