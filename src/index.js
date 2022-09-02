const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});

<<<<<<< Updated upstream
const { nodes, SpotifyClientID, SpotifySecret, token } = require("./config/config.json");

const { promisify } = require("util");
const { glob } = require("glob");
=======
const {
    promisify
} = require("util");
const {
    glob
} = require("glob");
>>>>>>> Stashed changes
const PG = promisify(glob);
const Ascii = require("ascii-table")

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

const Deezer = require("erela.js-deezer");
const Spotify = require("better-erela.js-spotify").default;
const Apple = require("better-erela.js-apple").default;
const { Manager } = require("erela.js");

require("./handlers/antiCrash")(client);

client.manager = new Manager({
    nodes,
    plugins: [
        new Spotify({
            clientID: SpotifyClientID,
            clientSecret: SpotifySecret,
        }),
        new Apple(),
        new Deezer(),
    ],
    send: (id, payload) => {
        let guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
});

client.distube = new DisTube(client, {
    youtubeDL: false,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

["giveawaySys"].forEach(system => {
    require(`../systems/${system}`)(client)
});

["events", "slashCommands", "commands", "buttons", "modals"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii)
});

<<<<<<< Updated upstream

client.tools = require("./console/errorEmbed");
=======
client.config = require("./config/config.json");
client.logger = require("../utils/logger");
client.tools = require("../utils/embedTools");
>>>>>>> Stashed changes
client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();
client.userSettings = new Collection();
client.prefixcmd = new Collection();
client.modals = new Collection();
<<<<<<< Updated upstream
client.logger = require("../utils/logger");
=======
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
>>>>>>> Stashed changes

module.exports = client;


<<<<<<< Updated upstream
client.login(token).then(() => {
}).catch((err) => {
    console.log(`[ERROR]`.red.bold, err)
});
=======
client.login(client.config.token).then(() => {}).catch((err) => {
    client.logger.log(err, "error")
});
>>>>>>> Stashed changes
