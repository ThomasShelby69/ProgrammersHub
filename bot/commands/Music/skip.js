const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
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

        const success = queue.skip();

        embed.setDescription(
            success
                ? `**${queue.current.title}**, Skipped song ✅`
                : `omething went wrong ❌`
        );
        return message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "skip",
    desc: "Skip the current song!",
};
