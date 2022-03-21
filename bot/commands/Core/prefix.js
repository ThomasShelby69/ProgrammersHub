const Discord = module.require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const prefixschema = require("../../db/prefix-schema");

module.exports.run = async (bot, message, args) => {
    let prefixco = await prefixschema
        .find({ onSale: 1, server: message.guild.id }, "server prefix")
        .sort({ value: 1 });
    let prefix;
    if (!prefixco[0]) {
        prefix = "pro!";
    } else {
        prefix = prefixco[0].prefix;
    }
    if (!args[0] || args[0] != "set") {
        try {
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setTitle(`Bot\'s Prefix`)
                        .setDescription(prefix)
                        .setFooter({
                            text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                        }),
                ],
            });
        } catch (e) {
            console.log(e.stack);
        }
    } else {
        if (!args[1]) {
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setTitle(`Please Enter New Prefix`)
                        .setDescription("Current Prefix: pro!")
                        .setFooter({
                            text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                        }),
                ],
            });
        } else {
            if (!prefixco[0]) {
                await new prefixschema({
                    server: message.guild.id,
                    prefix: args[1],
                })
                    .save()
                    .then(() => {
                        message.channel.send({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setTitle(`Updated Prefix`)
                                    .setDescription(
                                        `Prefix has been successfully updated to ${args[1]}.`
                                    )
                                    .setFooter({
                                        text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                                    }),
                            ],
                        });
                    });
            } else {
                await prefixschema
                    .findOneAndUpdate(
                        { server: message.guild.id },
                        { prefix: args[1] },
                        { new: true }
                    )
                    .then(() => {
                        message.channel.send({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setTitle(`Updated Prefix`)
                                    .setDescription(
                                        `Prefix has been successfully updated to ${args[1]}.`
                                    )
                                    .setFooter({
                                        text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                                    }),
                            ],
                        });
                    }, 1000);
            }
        }
    }
};

module.exports.help = {
    name: "prefix",
    desc: "This command helps you know the prefix of the bot.",
};
