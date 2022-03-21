const Discord = module.require("discord.js");
const { client, interaction } = require("discord.js");
const fs = require('fs');

const run = async (client, interaction) => {
    const { name } = interaction.guild
    const ping = Math.round(client.ws.ping)
    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const guild = client.guilds.cache.size
    let dir = 0;

    readdirSync('./commands/').forEach(dirs => {
      const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
      for (const file of commands) {
        dir+=1;
      };
    });
    const cmds = dir;
    interaction.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle(`Bot info`)
          .setThumbnail(client.user.displayAvatarURL())
          .addFields(
            {
              name: 'Bot Owner:',
              value: ">>> Thomas Shelby#6969",
            },
            {
              name: 'Ping:',
              value: ">>> " + ping.toString() + "ms",
            },
            {
              name: 'Uptime:',
              value: ">>> " + `${days}d ${hours}h ${minutes}m ${seconds}s`,
            },
            {
              name: 'Memory:',
              value: ">>> " + `${Math.round(used * 100) / 100} MB Heap`,
            },
            {
              name: 'Commands:',
              value: ">>> " + cmds.toString() + " cmds",
            },
            {
              name: 'Discord.js:',
              value: ">>> 13.6.0",
            }
          )
          .setFooter({text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 "})
      ]
    })
}

module.exports = {
    name: "botinfo",
    description: "This command helps you get all stats of bot.",
    type: "CHAT_INPUT",
    run
}