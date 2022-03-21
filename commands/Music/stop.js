const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",
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

        queue.destroy();

        embed.setDescription(
            `The music playing on this server has been turned off, see you next time ✅`
        );
        message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "stop",
    desc: "Stop the current song and end the queue!",
};
