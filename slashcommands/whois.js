const Discord = module.require("discord.js");
const { client, interaction } = require("discord.js");
const fs = require('fs');

const run = async (client, interaction) => {
    let memberparam = interaction.options.getMember("member");
    let memberuser = memberparam;
    if(memberparam==null){
        memberuser=interaction.guild.members.cache.get(interaction.user.id);
    }
    console.log(memberuser);

    let rolesname;
    let roles = memberuser.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);

    rolesname = roles.join(" | ")
    if (memberuser.roles.cache.size < 1) rolesname = "No Roles"
    if (!memberuser.roles.cache.size || memberuser.roles.cache.size - 1 < 1) roles = `\`None\``
    let botuser;
    if (memberuser.user.bot === false) {
        botuser = "No";
    } else {
        botuser = "Yes";
    }

    let userstatus;
    if (!memberuser.presence?.status) {
        userstatus = "Offline";
    } else {
        userstatus = memberuser.presence?.status;
    }

    let status;
    if (memberuser.presence === null) {
        status = "None";
    } else {
        if (memberuser.presence.activities[0] == null) {
            status = "None";
        } else {
            status = memberuser.presence.activities[0].state;
        }
    }

    if (status == null) {
        status = "None";
    }

    const person = client.users.cache.find(user => user.id = interaction.id.toString()).toString();
    interaction.reply({
        embeds: [
            new Discord.MessageEmbed()
                .setDescription(
                    `${memberuser}` + "\n\n**General**\n> <:dot:948182294450016286> \`-\` User - " + memberuser.user.username +
                    "\n> <:dot:948182294450016286> \`-\` Discriminator - " + memberuser.user.discriminator +
                    "\n> <:dot:948182294450016286> \`-\` ID - " + memberuser.id +
                    "\n> <:dot:948182294450016286> \`-\` Bot - " + botuser +
                    "\n> <:dot:948182294450016286> \`-\` Roles - " + roles.length +
                    "\n> <:dot:948182294450016286> \`-\` Created - " + memberuser.user.createdAt.toLocaleDateString('en-gb', { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }) +
                    "\n> <:dot:948182294450016286> \`-\` Joined - " + memberuser.joinedAt.toLocaleDateString('en-gb', { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }) +
                        
                    "\n\n**Presence**\n> <:dot:948182294450016286> \`-\` Status - "+userstatus.toUpperCase()+
                    "\n> <:dot:948182294450016286> \`-\` Custom Status - "+status+
                    "\n\n**Roles**\n"+`${rolesname || `\`That user has no roles\``}`)
                .setAuthor({ name: memberuser.user.tag, iconURL: memberuser.user.avatarURL({ dynamic: true, size: 512 }) })
                .setThumbnail(memberuser.user.avatarURL({ dynamic: true, size: 512 }))
                .setFooter({ text: `© Programmers Hub Bot` })
        ]
    })
}

module.exports = {
    name: "whois",
    description: "This command helps you get details of a user.",
    type: "CHAT_INPUT",
    options: [
        {
            name: "member", description: "For member information",
            type: "USER", required: false
        }],
    run
}