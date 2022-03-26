const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    try {
        let user =
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(
                (x) => x.user.username.toLowerCase() === args[0]
            ) ||
            message.author;
        user = await message.guild.members.fetch(user);

        if (!user.presence?.status) {
            message.reply({
                content:
                    "<:blobsweat:956482716830945321> User is Offline. Failed to fetch Spotify Status!",
            });
            return;
        }

        let presence = user.presence.activities;
        let spotify = "";

        const start = performance.now();
        presence.forEach(function (item, index) {
            if (
                item !== null &&
                item.type === "LISTENING" &&
                item.name === "Spotify" &&
                item.assets !== null
            )
                spotify = item;
            return;
        });
        const duration = performance.now() - start;

        if (!spotify) {
            return message.reply({
                content: "**This user isn't listening to Spotify!**",
            });
        }

        let trackIMG = `https://i.scdn.co/image/${spotify.assets.largeImage.slice(
            8
        )}`;
        let trackURL = `https://open.spotify.com/track/${spotify.syncId}`;
        let trackName = spotify.details;
        let trackAuthor = spotify.state;
        let trackAlbum = spotify.assets.largeText;

        const embed = new Discord.MessageEmbed()
            .setAuthor({
                name: "Spotify Track Info",
                iconURL:
                    "https://cdn.discordapp.com/emojis/956382916332634142.webp",
            })
            .setColor("GREEN")
            .setThumbnail(trackIMG)
            .addField("Song Name", trackName, true)
            .addField("Album", trackAlbum, true)
            .addField("Author", trackAuthor, false)
            .addField("Listen to Track", `[Click to open](${trackURL})`, false)
            .setFooter({
                text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969",
                iconURL: message.author.displayAvatarURL(),
            })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    } catch (e) {
        console.log(e.stack);
    }
};

module.exports.help = {
    name: "spotifyactivity",
    desc: "This command helps you know spotify activity of a user.",
    aliases: ["spotify"],
};
