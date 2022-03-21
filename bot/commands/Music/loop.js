const { QueueRepeatMode } = require("discord-player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
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

        if (args.join("").toLowerCase() === "queue") {
            if (queue.repeatMode === 1) {
                embed.setDescription(
                    `You should disable loop mode of existing music first **(${client.config.px}loop)** ❌`
                );
                return message.reply({ embeds: [embed] });
            }
            const success = queue.setRepeatMode(
                queue.repeatMode === 0
                    ? QueueRepeatMode.QUEUE
                    : QueueRepeatMode.OFF
            );

            embed.setDescription(
                success
                    ? `Loop Mode: **${
                          queue.repeatMode === 0 ? "Inactive" : "Active"
                      }**, The whole sequence will repeat non-stop 🔁`
                    : `Something went wrong. ❌`
            );
            return message.reply({ embed: [embed] });
        } else {
            if (queue.repeatMode === 2) {
                embed.setDescription(
                    `In Loop mode you must disable existing queue first **(${client.config.px}loop queue)** ❌`
                );
                return message.reply({ embeds: [embed] });
            }

            const success = queue.setRepeatMode(
                queue.repeatMode === 0
                    ? QueueRepeatMode.TRACK
                    : QueueRepeatMode.OFF
            );

            embed.setDescription(
                success
                    ? `Loop Mode: **${
                          queue.repeatMode === 0 ? "Inactive" : "Active"
                      }**, Current music will be repeated non-stop (all music in the list **${
                          client.config.px
                      }loop queue**  You can repeat it with the option.) 🔂`
                    : `Something went wrong ❌`
            );
            return message.reply({ embed: [embed] });
        }
    },
};

module.exports.help = {
    name: "loop",
    aliases: ["lp"],
    desc: "Loop Music!",
};
