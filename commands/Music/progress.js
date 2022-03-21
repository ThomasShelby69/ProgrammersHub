const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "progress",
    voiceChannel: true,

    async run(client, message) {
        const embed = new MessageEmbed();
        embed.setColor("BLACK");
        embed.setTimestamp();
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            embed.setDescription(`No music currently playing! ❌`);
            return message.reply({ embeds: [embed] });
        }

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == "Infinity") {
            embed.setDescription(
                `This song is live streaming, no duration data to display. 🎧`
            );
            return message.reply({ embeds: [embed] });
        }

        embed.setDescription(`${progress} (**${timestamp.progress}**%)`);
        message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "progress",
    desc: "Tells the progress of current song!",
};
