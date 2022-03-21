const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
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

        const success = queue.setPaused(true);

        embed.setDescription(
            success
                ? `The currently playing music named **${queue.current.title}** has stopped ✅`
                : `Something went wrong. ❌`
        );
        return message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "pause",
    desc: "Pause Song!",
};
