const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    try {
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            if (!args[0])
                return message
                    .reply("You didn't specify how many messages to delete.")
                    .then((msg) => {
                        setTimeout(() => msg.delete(), 3000);
                    });
            let count = args[0];
            if (Number.isNaN(+count))
                return message.reply("Not a number.").then((msg) => {
                    setTimeout(() => msg.delete(), 3000);
                });
            message.channel.messages
                .fetch({ limit: parseInt(count) + 1 })
                .then((messages) => {
                    message.channel.bulkDelete(messages);
                    message.channel
                        .send("Messages Deleted Successfully")
                        .then((msg) => {
                            setTimeout(() => msg.delete(), 3000);
                        });
                });
        } else return;
    } catch (e) {
        console.log(e.stack);
    }
};

module.exports.help = {
    name: "purge",
    desc: "This command helps you purge messages of any channel.",
};
