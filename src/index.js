const {
    Client,
    Collection
} = require("discord.js");
const client = new Client({
    intents: 131071
});


const {
    promisify
} = require("util");
const {
    glob
} = require("glob");
const PG = promisify(glob);

const Deezer = require("erela.js-deezer");
const Spotify = require("better-erela.js-spotify").default;
const Apple = require("better-erela.js-apple").default;
const {
    Manager
} = require("erela.js");

require("./handlers/antiCrash")(client);

["giveawaySys"].forEach(system => {
    require(`../systems/${system}`)(client)
});

["events", "slashCommands", "commands", "buttons", "modals"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG)
});

client.config = require("./config.json");
client.tools = require("../utils/embedTools");
client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();
client.userSettings = new Collection();
client.prefixcmd = new Collection();
client.modals = new Collection();
client.logger = require("../utils/logger");
client.manager = new Manager({
    nodes: client.config.nodes,
    plugins: [
        new Spotify({
            clientID: client.config.SpotifyClientID,
            clientSecret: client.config.SpotifySecret,
        }),
        new Apple(),
        new Deezer(),
    ],
    autoplay: true,
    send: (id, payload) => {
        let guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
});

module.exports = client;


client.login(client.config.token).then(() => {}).catch((err) => {
    client.logger.log(err, "error")
});