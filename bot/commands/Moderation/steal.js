const Discord = module.require("discord.js");
const {Util} = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    try {
        if (message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS ")) {
            if(!args[0]) return message.reply("Please specify an emoji!").then((message) => {
                setTimeout(() => message.delete(), 3000);
            });
            if(!args[1]) return message.reply("Please specify emoji name!").then((message) => {
                setTimeout(() => message.delete(), 3000);
            });
            const emoji = args[0];
            let customemoji = Util.parseEmoji(emoji);
            if(customemoji.id){
                const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`;
                const name = args[1];
                message.guild.emojis.create(`${Link}`,`${name}`).then(()=>{
                    message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setTitle(`Emoji Successfully Added`)
                                .setDescription(
                                    `Added ${Link}`
                                )
                                .setFooter({
                                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                                }),
                        ],
                    });
                }).catch((e)=>{
                    message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setTitle(`Emoji Successfully Added`)
                                .setDescription(
                                    `${e}`
                                )
                                .setFooter({
                                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                                }),
                        ],
                    });
                });
            }
        }
    } catch (e) {
        console.log(e.stack);
    }
};

module.exports.help = {
    name: "steal",
    desc: "This command helps you steal emojis.",
};
