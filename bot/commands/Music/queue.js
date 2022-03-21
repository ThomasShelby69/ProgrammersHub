const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    voiceChannel: true,

    run(client, message) {
        const embedsend = new MessageEmbed();
        embedsend.setColor('BLACK');
        embedsend.setTimestamp();
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            embedsend.setDescription(`No music currently playing! ❌`);
            return message.reply({ embeds: [embedsend] });
        }

        if (!queue.tracks[0]){
            embedsend.setDescription(`No music in queue after current. ❌`);
            return message.reply({ embeds: [embedsend] });
        }

        const embed = new MessageEmbed();
        const methods = ['🔁', '🔂'];

        embed.setColor('BLACK');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`Server Music List - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Started by <@${track.requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** Other Song...` : `There are **${songs}** Songs in the List.`;

        embed.setDescription(`Currently Playing: \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();
        embed.setFooter('© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969', message.author.avatarURL({ dynamic: true }));

        message.reply({ embeds: [embed] });
    },
};

module.exports.help = {
    name: "queue",
    desc: "Tells the current queue!"
}