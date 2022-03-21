const maxVol = require("../../musicconfig.js").opt.maxVol;
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    voiceChannel: true,

    run(client, message, args) {
        const embed = new MessageEmbed();
        embed.setColor("BLACK");
        embed.setTimestamp();
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            embed.setDescription(`No music currently playing! ❌`);
            return message.reply({ embeds: [embed] });
        }

        const vol = parseInt(args[0]);

        if (!vol) {
            embed.setDescription(
                `Current volume: **${queue.volume}** 🔊\n**To change the volume, with \`1\` to \`${maxVol}\` Type a number between.**`
            );
            return message.reply({ embeds: [embed] });
        }

        if (queue.volume === vol) {
            embed.setDescription(
                `The volume you want to change is already the current volume ❌`
            );
            return message.reply({ embeds: [embed] });
        }

        if (vol < 0 || vol > maxVol) {
            embed.setDescription(
                `**Type a number from \`1\` to \`${maxVol}\` to change the volume .** ❌`
            );
            return message.reply({ embeds: [embed] });
        }

        const success = queue.setVolume(vol);

        embed.setDescription(
            success
                ? `Volume changed: **${vol}%**/**${maxVol}** 🔊`
                : `Something went wrong. ❌`
        );
        return message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "volume",
    desc: "Change volume for the bot!",
};
