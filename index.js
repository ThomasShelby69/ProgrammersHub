// const keepAlive = require("./server");
const { Intents } = require("discord.js");
const Discord = require("discord.js");
const { Player } = require("discord-player");
const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();
const Statcord = require("statcord.js");
const mongoose = require("mongoose");
const prefixschema = require("./db/prefix-schema");
const guildSchema = require("./db/guild-schema");

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

client.commands = new Discord.Collection();

let bot = {
    client,
};

const statcord = new Statcord.Client({
    client,
    key: process.env.statcord,
    postCpuStatistics: true /* Whether to post memory statistics or not, defaults to true */,
    postMemStatistics: true /* Whether to post memory statistics or not, defaults to true */,
    postNetworkStatistics: true /* Whether to post memory statistics or not, defaults to true */,
});

client.config = require("./musicconfig");
client.player = new Player(client, client.config.opt.discordPlayer);
const player = client.player;

readdirSync("./commands/").forEach((dirs) => {
    const commands = readdirSync(`./commands/${dirs}`).filter((files) =>
        files.endsWith(".js")
    );
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.help.name.toLowerCase(), command);
        if (command.help.aliases) {
            command.help.aliases.forEach((alias) => {
                client.commands.set(alias, command);
            });
        }
    }
    console.log(`${dirs} Commands Loaded Successfully!`);
});

client.on("ready", async () => {
    await mongoose.connect(process.env.mongo, { keepAlive: true }).then(() => {
        console.log("Mongo Connected");
    });
    statcord.autopost().then(() => {
        console.log("Statcord Connected");
    });

    console.log(`Logged in as ${client.user.tag}!`);
    let statuses = [
        { name: "Coming Soon", type: "WATCHING" },
        { name: "pro!", type: "LISTENING" },
        { name: "Programmers Hub", type: "PLAYING" },
    ];
    let i = 0;
    setInterval(() => {
        let status = statuses[i];
        if (!status) {
            status = statuses[0];
            i = 0;
        }
        client.user.setPresence({
            activities: [status],
            status: "online",
        });
        i++;
    }, 5000);
    const link = client.generateInvite({
        scopes: ["applications.commands", "bot"],
        permissions: ["8"],
    });
    console.log(`Generated application invite link: ${link}`);
});

client.on("guildCreate",async (guild) => {
    await new guildSchema({
        server: guild.id,
    }).save();
});
client.on("guildDelete",async (guild) => {
    await guildSchema.findOneAndDelete({
        server: guild.id,
    });
    await prefixschema.findOneAndDelete({
        server: guild.id,
    });
});

client.slashcommands = new Discord.Collection();

client.loadSlashCommands = (bot, reload) =>
    require("./handlers/slashcommands")(bot, reload);
client.loadSlashCommands(bot, false);

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild())
        interaction.reply("This command can only be used in a server");

    const slashcmd = client.slashcommands.get(interaction.commandName);

    if (!slashcmd) return interaction.reply("Invalid slash command");

    if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm))
        return interaction.reply(
            "You do not have permissions to use this command"
        );

    slashcmd.run(client, interaction);
});

client.on("guildMemberAdd", (member) => {
    if (member.guild == 947144607274237962) {
        member.guild.channels.cache
            .get("947144607274237965")
            .send(
                `Hey ${member}! Welcome to the server. Thanks for joining. Feel free to walk through the community!! You could grab some cool roles from <#947146328738246666>  & Introduce yourself to the community <#947146440134758430>.`
            );
    }
});
client.on("guildCreate", (guild) => {
    setTimeout(async () => {
        await new prefixschema({
            server: guild.id,
            prefix: "pro!",
        }).save();
    }, 1000);
});

client.on("messageCreate", async (message) => {
    let prefixco = await prefixschema
        .find({ onSale: 1, server: message.guild.id }, "server prefix")
        .sort({ value: 1 });
    let prefix;
    if (!prefixco[0]) {
        prefix = "pro!";
    } else {
        prefix = prefixco[0].prefix;
    }

    const embed = new MessageEmbed();
    embed.setColor("BLACK");

    if (message.author.bot) return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = client.commands.get(command.slice(prefix.length));
    const DJ = client.config.opt.DJ;

    if (!message.toString().startsWith(prefix)) return;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(
            (x) => x.name === DJ.roleName
        );

        if (!message.member.roles.cache.has(roleDJ.id)) {
            embed.setDescription(
                `${message.author}, This command is set only for those with the ${DJ.roleName} role. ❌`
            );
            return message.reply({ embeds: [embed] });
        }
    }

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel) {
            embed.setDescription(
                `You are not connected to an audio channel. ❌`
            );
            return message.reply({ embeds: [embed] });
        }
        if (
            message.guild.me.voice.channel &&
            message.member.voice.channel.id !==
                message.guild.me.voice.channel.id
        ) {
            embed.setDescription(
                `You are not on the same audio channel as me. ❌`
            );
            return message.reply({ embeds: [embed] });
        }
    }

    if (cmd) {
        cmd.run(client, message, args);
        statcord.postCommand(cmd.help.name, message.author.id);
        statcord.post();
    }
});

// Music Player
player.on("error", (queue, error) => {
    console.log(`There was a problem with the song queue => ${error.message}`);
});

player.on("connectionError", (queue, error) => {
    console.log(`I'm having trouble connecting => ${error.message}`);
});

player.on("trackStart", (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new MessageEmbed();
    embed.setColor("BLACK");
    embed.setDescription(
        `🎵 Music started playing: **${track.title}** \n\n Channel: **${queue.connection.channel.name}** 🎧`
    );
    queue.metadata.send({ embeds: [embed] });
});

player.on("trackAdd", (queue, track) => {
    const embed = new MessageEmbed();
    embed.setColor("BLACK");
    embed.setDescription(`**${track.title}** added to playlist. ✅`);
    queue.metadata.send({ embeds: [embed] });
});

player.on("botDisconnect", (queue) => {
    const embed = new MessageEmbed();
    embed.setColor("BLACK");
    embed.setDescription(
        "Someone from the audio channel Im connected to kicked me out, the whole playlist has been cleared! ❌"
    );
    queue.metadata.send({ embeds: [embed] });
});

player.on("channelEmpty", (queue) => {
    const embed = new MessageEmbed();
    embed.setColor("BLACK");
    embed.setDescription(
        "I left the audio channel because there is no one on my audio channel. ❌"
    );
    queue.metadata.send({ embeds: [embed] });
});

player.on("queueEnd", (queue) => {
    const embed = new MessageEmbed();
    embed.setColor("BLACK");
    embed.setDescription(
        "All play queue finished, I think you can listen to some more music. ✅"
    );
    queue.metadata.send({ embeds: [embed] });
});

statcord.on("autopost-start", () => {
    console.log("Started autopost");
});

statcord.on("post", (status) => {
    if (!status) console.log("Successful post");
    else console.error(status);
});

client.login(process.env.token);
