const Discord = module.require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const prefixschema = require("../../db/prefix-schema");

const run = async (client, interaction) => {
    let setnew = interaction.options.getString("set");
    let prefixco = await prefixschema
        .find({ onSale: 1, server: interaction.guild.id }, "server prefix")
        .sort({ value: 1 });
    let prefix;
    if (!prefixco[0]) {
        prefix = "pro!";
    } else {
        prefix = prefixco[0].prefix;
    }
    if(!setnew){
        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setTitle(`Bot\'s Prefix`)
                    .setDescription(`${prefix}`)
                    .setFooter({
                        text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                    }),
            ],
        });
    }
    else{
        if (!prefixco[0]) {
            await new prefixschema({
                server: interaction.guild.id,
                prefix: setnew,
            })
                .save()
                .then(() => {
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setTitle(`Updated Prefix`)
                                .setDescription(
                                    `Prefix has been successfully updated to ${setnew}.`
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
                    { server: interaction.guild.id },
                    { prefix: setnew },
                    { new: true }
                )
                .then(() => {
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setTitle(`Updated Prefix`)
                                .setDescription(
                                    `Prefix has been successfully updated to ${setnew}.`
                                )
                                .setFooter({
                                    text: "© Programmers Hub Bot | Bot Made by: Thomas Shelby#6969 ",
                                }),
                        ],
                    });
                }, 1000);
        }
    }
};

module.exports = {
    name: "prefix",
    description: "This command helps you know the prefix of the bot.",
    type: "CHAT_INPUT",
    options: [
        {
            name: "set",
            description: "Set New Prefix",
            type: "STRING",
            required: false,
        },
    ],
    run,
};
