const client = require("../../src/index");

module.exports = {
    name: "nodeReconnect",
};

client.manager

    .on("nodeReconnect", (node) => {
        client.logger.log(`[LAVALINK] Node "${node.options.identifier}" reconnected!`, "log")
    })
