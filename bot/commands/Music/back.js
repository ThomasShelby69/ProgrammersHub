const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "back",
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

        if (!queue.previousTracks[1]) {
            embed.setDescription(`There was no music playing before ❌`);
            return message.reply({ embeds: [embed] });
        }

        await queue.back();

        embed.setDescription(`Previous music started playing... ✅`);
        message.reply(embed);
    },
};

module.exports.help = {
    name: "back",
    desc: "Play last song!",
};
