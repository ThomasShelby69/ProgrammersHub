const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "filter",
    voiceChannel: true,

    async run(client, message, args) {
        const embed = new MessageEmbed();
        embed.setColor("BLACK");
        embed.setTimestamp();
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            embed.setDescription(`There is no music currently playing!. ❌`);
            return message.reply({ embeds: [embed] });
        }

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) {
            embed.setDescription(
                `Please enter a valid filter name. ❌\n\`bassboost, 8D, nightcore\``
            );
            return message.reply({ embeds: [embed] });
        }

        const filters = [];
        queue.getFiltersEnabled().map((x) => filters.push(x));
        queue.getFiltersDisabled().map((x) => filters.push(x));

        const filter = filters.find(
            (x) => x.toLowerCase() === args[0].toLowerCase()
        );

        if (!filter) {
            embed.setDescription(
                `I couldn't find a filter with your name. ❌\n\`bassboost, 8D, nightcore\``
            );
            return message.reply({ embeds: [embed] });
        }

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter)
            ? false
            : true;

        await queue.setFilters(filtersUpdated);

        embed.setDescription(
            `Applied: **${filter}**, Filter Status: **${
                queue.getFiltersEnabled().includes(filter)
                    ? "Active"
                    : "Inactive"
            }** ✅\n **Remember, if the music is long, the filter application time may be longer accordingly.**`
        );
        message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "filter",
    desc: "Add filters to music! Bassboost, 8D, Nightcore",
};
