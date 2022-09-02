const client = require("../../index");

module.exports = {
    name: "nodeRaw",
};

client.on("raw", (d) => client.manager.updateVoiceState(d));