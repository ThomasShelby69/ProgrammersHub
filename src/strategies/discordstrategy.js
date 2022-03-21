const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const DiscordUser = require("../models/DiscordUser");

passport.serializeUser(async (user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findById(id);
    if (user){
        done(null, user);
    }
});

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CLIENT_REDIRECT,
            scope: ["identify", "guilds", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await DiscordUser.findOne({
                    discordId: profile.id,
                });
                if (user) {
                    const updateduser = await DiscordUser.findOneAndUpdate(
                        { discordId: profile.id },
                        {
                            username: profile.username,
                            avatar: profile.avatar,
                            email: profile.email,
                            guilds: profile.guilds,
                        },
                        { new: true }
                    );
                    done(null, updateduser);
                } else {
                    const newUser = await DiscordUser.create({
                        discordId: profile.id,
                        username: profile.username,
                        avatar: profile.avatar,
                        email: profile.email,
                        guilds: profile.guilds,
                    });
                    const savedUser = await newUser.save();
                    done(null, savedUser);
                }
            } catch (err) {
                console.log(err);
                done(err, null);
            }
        }
    )
);
