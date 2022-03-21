const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    try {
        if (message.member.permissions.has("KICK_MEMBERS")) {
            if (!args[0])
                return message
                    .reply("You didn't specify the user.")
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 3000);
                    });
            let reason;
            if (!args[1]) {
                reason = "No Reason Provided";
            } else {
                reason = args[1];
            }
            let member =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);
            console.log(member);
            const kickembed = new MessageEmbed();
            kickembed.setColor("BLACK");
            kickembed.setTimestamp();
            kickembed.setTitle(
                `You have been kicked from **${message.guild.name}**`
            );
            kickembed.setDescription(`\n\nReason: ${reason}`);
            kickembed.setFooter({
                text: bot.user.tag,
                iconURL: bot.user.displayAvatarURL(),
            });

            const kicked = new MessageEmbed();
            kicked.setColor("RANDOM");
            kicked.setDescription(
                `*${member} has been kicked from the server.*`
            );

            if (!member) return message.reply("Invalid User.");

            if (!member.kickable)
                return message.reply("User can not be kicked.");

            try {
                member.send({ embeds: [kickembed] }).then(() => {
                    member.kick(reason).then(() => {
                        message.channel.send({ embeds: [kicked] });
                        message.delete();
                    });
                });
            } catch (err) {
                member.kick(reason).then(() => {
                    message.channel.send({ embeds: [kicked] });
                    message.delete();
                });
            }

            return;
        } else return;
    } catch (e) {
        console.log(e.stack);
    }
};

module.exports.help = {
    name: "kick",
    desc: "This command kicks the user.",
};
