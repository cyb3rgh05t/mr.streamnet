const { Client } = require("discord.js");
const client = require("../../src/index");

module.exports = {
    name: "nodeRaw",
};

client.on("raw", (d) => client.manager.updateVoiceState(d));