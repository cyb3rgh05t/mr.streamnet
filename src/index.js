const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 131071 });
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);

require("./handlers/antiCrash")(client);

["giveawaySys"].forEach(system => {
    require(`./systems/${system}`)(client)
});

["events", "slashCommands", "commands", "buttons", "modals"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG)
});

client.config = require("./config/config.json");
client.logger = require("./functions/logger");
client.tools = require("./functions/tools")
client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();
client.userSettings = new Collection();
client.prefixcmd = new Collection();
client.modals = new Collection();

module.exports = client;

client.login(client.config.token).then(() => {}).catch((err) => {
    client.logger.log(err, "error")
});