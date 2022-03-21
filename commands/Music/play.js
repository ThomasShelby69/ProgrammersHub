const { QueryType } = require("discord-player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    voiceChannel: true,

    async run(client, message, args) {
        const embed = new MessageEmbed();
        embed.setColor("BLACK");
        embed.setTimestamp();
        if (!args[0]) {
            embed.setDescription(
                `Write the name of the music you want to search. 🎶`
            );
            return message.reply({ embeds: [embed] });
        }

        const res = await client.player.search(args.join(" "), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO,
        });

        if (!res || !res.tracks.length) {
            embed.setDescription(
                `No results found! Please send Music URL instead. ❌`
            );
            return message.reply({ embeds: [embed] });
        }

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel,
        });

        try {
            if (!queue.connection)
                await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            embed.setDescription(`I can't join audio channel. 🔉`);
            return message.reply({ embeds: [embed] });
        }

        embed.setDescription(
            `${res.playlist ? "Your Playlist" : "Your Track"} Loading... 🎧`
        );
        await message.reply({ embeds: [embed] });

        res.playlist
            ? queue.addTracks(res.tracks)
            : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};

module.exports.help = {
    name: "play",
    desc: "Play Song!",
};
