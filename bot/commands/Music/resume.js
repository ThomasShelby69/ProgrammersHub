const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    voiceChannel: true,

    run(client, message) {
        const embed = new MessageEmbed();
        embed.setColor("BLACK");
        embed.setTimestamp();
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            embed.setDescription(`No music currently playing! ❌`);
            return message.reply({ embeds: [embed] });
        }

        const success = queue.setPaused(false);

        embed.setDescription(
            success
                ? `**${queue.current.title}**, The song continues to play. ✅`
                : `${message.author}, Something went wrong. ❌`
        );
        return message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "resume",
    desc: "Resumes the song!",
};
