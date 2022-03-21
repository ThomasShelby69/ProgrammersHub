const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
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

        if (!queue.tracks[0]) {
            embed.setDescription(
                `There is already no music in queue after the current one ❌`
            );
            return message.reply({ embeds: [embed] });
        }

        await queue.clear();

        embed.setDescription(`The queue has just been cleared. 🗑️`);
        message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "clear",
    desc: "Clear queue!"
};
