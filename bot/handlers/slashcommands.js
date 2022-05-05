const fs = require("fs")

const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}

module.exports = (bot, reload) => {
    const { client } = bot 

    fs.readdirSync("./bot/slashcommands/").forEach((dirs) => {
        let slashcommands = getFiles(`./bot/slashcommands/${dirs}/`, ".js")

        if (slashcommands.length === 0)
            console.log("No slash commands loaded")
    
        slashcommands.forEach(f => {
            if (reload) delete require.cache[require.resolve(`../slashcommands/${dirs}/${f}`)]
            const slashcmd = require(`../slashcommands/${dirs}/${f}`)
            client.slashcommands.set(slashcmd.name, slashcmd)
        })
    });
} 