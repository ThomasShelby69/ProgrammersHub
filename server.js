require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const discordStrategy = require("./src/strategies/discordstrategy");
const db = require("./src/database/database");
const path = require("path");
const bodyParser = require("body-parser");

// Mongoose
db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
    console.log(err)
);

// Routes
const authRoute = require("./src/routes/auth");
const dashboardRoute = require("./src/routes/dashboard");

app.enable("trust proxy");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: "some random secret",
        cookie: {
            maxAge: 60000 * 60 * 24,
        },
        resave: true,
        saveUninitialized: true,
        name: "discord-oauth2",
        store: MongoStore.create({
            mongoUrl: process.env.mongo,
        }),
    })
);

app.set("view engine", "ejs");
app.set("views", path.join("src/views"));
app.use(express.static("src/public"));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);

app.get("/", (req, res) => {
    let authorization;
    if (req.user) {
        authorization = "Dashboard";
    } else {
        authorization = "Login";
    }
    res.render("home", {
        authorization: authorization,
    });
});

app.get("/discord", (req, res) => {
    res.render("discord");
});

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
