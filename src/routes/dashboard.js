const router = require("express").Router();
const { Permissions } = require("discord.js");
const BotinGuild = require("../models/BotinGuild");
const Prefix = require("../models/client/prefix");
const bodyParser = require("body-parser");

function isAuthorized(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/");
    }
}
router.get("/", isAuthorized, async (req, res) => {
    let guildarray = [];
    let botarray = [];
    req.user.guilds.forEach((guild) => {
        const perm = BigInt(guild.permissions);
        const bitPermissions = new Permissions(perm);
        if (
            bitPermissions.has(
                Permissions.FLAGS.MANAGE_CHANNELS &&
                    Permissions.FLAGS.ADMINISTRATOR
            )
        ) {
            guildarray.push(guild);
        } else {
        }
    });
    for (const guild of guildarray) {
        const guildcheck = await BotinGuild.findOne({
            server: guild.id,
        });
        if (guildcheck) {
            botarray.push(true);
        } else {
            botarray.push(false);
        }
    }
    res.render("dashboard", {
        username: req.user.username,
        discordId: req.user.discordId,
        avatar: req.user.avatar,
        guilds: guildarray,
        botinguild: botarray,
    });
});

router.get("/:guildid", isAuthorized, async (req, res) => {
    let guildmanageablebyuser = false;
    req.user.guilds.forEach((guild) => {
        const perm = BigInt(guild.permissions);
        const bitPermissions = new Permissions(perm);
        if (
            bitPermissions.has(
                Permissions.FLAGS.MANAGE_CHANNELS &&
                    Permissions.FLAGS.ADMINISTRATOR
            )
        ) {
            if (req.params.guildid == guild.id) {
                guildmanageablebyuser = true;
            }
        } else {
        }
    });
    if (guildmanageablebyuser == true) {
        const guildprefix = await Prefix.findOne({
            server: req.params.guildid,
        });
        res.render("server/server.ejs", {
            username: req.user.username,
            guildprefix: guildprefix.prefix,
        });
    } else {
        res.redirect("/dashboard");
    }
});

router.post("/:guildid", isAuthorized, async (req, res) => {
    await Prefix.findOneAndUpdate(
        { server: req.params.guildid },
        { prefix: req.body.prefix },
        { new: true }
    ).then(() => {
        res.redirect(req.get("referer"));
    });
});

module.exports = router;
