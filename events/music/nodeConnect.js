const client = require("../../src/index");

module.exports = {
    name: "nodeConnect",
};

client.manager

    .on("nodeConnect", (node) => {
        client.logger.log(`[LAVALINK] Node Connection has been established to "${node.options.identifier}"`, "log")
        client.logger.log(`[LAVALINK] Node "${node.options.name}" is ready!`, "ready")
    })

    .on("nodeReconnect", (node) => {
        client.logger.log(`[LAVALINK] Node "${node.options.identifier}" reconnected.`, "log")
    })

    .on("nodeDisconnect", (node, error) => {
        client.logger.log(`[LAVALINK] Node lost connection to "${node.options.identifier}" due to an error: ${error.message}`, "error")
    })

    .on("nodeError", (node, error) => {
        client.logger.log(`[LAVALINK] Node "${node.options.identifier}" has encountered an error: ${error.message}`, "error")
    })