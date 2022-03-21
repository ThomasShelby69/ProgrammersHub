const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "nowplaying",
    voiceChannel: true,

    run(client, message) {
        const embedsend = new MessageEmbed();
        embedsend.setColor("BLACK");
        embedsend.setTimestamp();
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            embedsend.setDescription(`No music currently playing! ❌`);
            return message.reply({ embeds: [embedsend] });
        }

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor("BLACK");
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title);

        const methods = ["disabled", "track", "queue"];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration =
            timestamp.progress == "Forever" ? "Endless (Live)" : track.duration;

        embed.setDescription(
            `Audio **%${
                queue.volume
            }**\nDuration **${trackDuration}**\nLoop Mode **${
                methods[queue.repeatMode]
            }**\n${track.requestedBy}`
        );

        embed.setTimestamp();
        embed.setFooter(
            "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969",
            message.author.avatarURL({ dynamic: true })
        );

        message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "nowplaying",
    aliases: ["np"],
    desc: "Tells the current song being played!",
};
