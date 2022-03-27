const Discord = module.require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } =
    module.require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const afkschema = require("../../db/afk-schema");

module.exports.run = async (bot, message, args) => {
    let checkafkguild = await afkschema
        .find({ onSale: 1, server: message.guild.id }, "member time")
        .sort({ value: 1 });
    let checkafkmember = false;
    checkafkguild.forEach((guildafk) => {
        if (guildafk.member == message.author.id) {
            checkafkmember = true;
        }
    });
    if (checkafkmember == false) {
        if (!args[0]) {
            await new afkschema({
                server: message.guild.id,
                member: message.author.id,
                message: "AFK",
                time: Date.now(),
            })
                .save()
                .then(() => {
                    message.member.setNickname("[AFK] "+message.author.username).catch(()=>{});
                    message.reply({
                        embeds: [
                            new Discord.MessageEmbed().setDescription(
                                `Set your AFK to **AFK**.`
                            ),
                        ],
                    });
                });
        } else if (args[0]) {
            await new afkschema({
                server: message.guild.id,
                member: message.author.id,
                message: args[0],
                time: Date.now(),
            })
                .save()
                .then(() => {
                    message.member.setNickname("[AFK] "+message.author.username).catch(()=>{});
                    message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setTitle(`AFK`)
                                .setDescription(
                                    `Set your AFK to **${args[0]}**`
                                )
                                .setFooter({
                                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                                }),
                        ],
                    });
                });
        }
    } else {
        await afkschema
            .findOneAndDelete({
                server: message.guild.id,
                member: message.author.id,
            })
            .then(() => {
                message.member.setNickname(null).catch(()=>{});
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed().setDescription(
                            `Welcome Back!`
                        ),
                    ],
                });
            });
    }
};

module.exports.help = {
    name: "afk",
    desc: "This command sets an AFK status to display when you are mentioned.",
};
