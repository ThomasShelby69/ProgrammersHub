const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
    name: "search",
    voiceChannel: true,

    async run(client, message, args) {
        const embedsend = new MessageEmbed();
        embedsend.setColor("BLACK");
        embedsend.setTimestamp();

        if (!args[0]) {
            embedsend.setDescription(`Please enter a valid song name. ❌`);
            return message.reply({ embeds: [embedsend] });
        }

        const res = await client.player.search(args.join(" "), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO,
        });

        if (!res || !res.tracks.length) {
            embedsend.setDescription(`No search results found. ❌`);
            return message.reply({ embeds: [embedsend] });
        }

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel,
        });

        const embed = new MessageEmbed();

        embed.setColor("BLACK");
        embed.setTitle(`Searched Music: ${args.join(" ")}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(
            `${maxTracks
                .map(
                    (track, i) =>
                        `**${i + 1}**. ${track.title} | ${track.author}`
                )
                .join("\n")}\n\nChoose a song from **1** to **${
                maxTracks.length
            }** write send or write **cancel** and cancel selection.⬇️`
        );

        embed.setTimestamp();
        embed.setFooter(
            "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969",
            message.author.avatarURL({ dynamic: true })
        );

        message.reply({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ["time"],
            filter: (m) => m.author.id === message.author.id,
        });

        collector.on("collect", async (query) => {
            if (query.content.toLowerCase() === "cancel") {
                embedsend.setDescription(`Call cancelled. ✅`);
                return (
                    message.reply({ embeds: [embedsend] }) && collector.stop()
                );
            }

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) {
                embedsend.setDescription(
                    `Error: select a song **1** to **${maxTracks.length}** and write send or type **cancel** and cancel selection. ❌`
                );
                return message.reply({ embeds: [embedsend] });
            }

            collector.stop();

            try {
                if (!queue.connection)
                    await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                embedsend.setDescription(`I can't join audio channel. ❌`);
                return message.reply({ embeds: [embedsend] });
            }

            embedsend.setDescription(`Loading your music call. 🎧`);
            await message.reply({ embeds: [embedsend] });

            queue.addTrack(res.tracks[Number(query.content) - 1]);
            if (!queue.playing) await queue.play();
        });

        collector.on("end", (msg, reason) => {
            if (reason === "time") {
                embedsend.setDescription(`Song search time expired ❌`);
                return message.reply({ embeds: [embedsend] });
            }
        });
    },
};

module.exports.help = {
    name: "search",
    desc: "Searches music and gets you search results to choose from!",
};
