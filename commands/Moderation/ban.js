const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    try {
        if (message.member.permissions.has("BAN_MEMBERS")) {
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
            const banembed = new MessageEmbed();
            banembed.setColor("BLACK");
            banembed.setTimestamp();
            banembed.setTitle(
                `You have been banned from **${message.guild.name}**`
            );
            banembed.setDescription(`\n\nReason: ${reason}`);
            banembed.setFooter({
                text: bot.user.tag,
                iconURL: bot.user.displayAvatarURL(),
            });

            const banned = new MessageEmbed();
            banned.setColor("RANDOM");
            banned.setDescription(
                `*${member} has been banned from the server.*`
            );

            if (!member) return message.reply("Invalid User.");

            if (!member.bannable)
                return message.reply("User can not be banned.");

            try {
                member.send({ embeds: [banembed] }).then(() => {
                    member.ban({ reason: reason }).then(() => {
                        message.channel.send({ embeds: [banned] });
                        message.delete();
                    });
                });
            } catch (err) {
                member.ban({ reason: reason }).then(() => {
                    message.channel.send({ embeds: [banned] });
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
    name: "ban",
    desc: "This command bans the user.",
};
