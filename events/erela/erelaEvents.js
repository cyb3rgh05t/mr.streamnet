const client = require("../../src/index");
const colors = require("colors");

client.manager
    .on("nodeConnect", (node) => {
        client.logger.log(`[LAVALINK] Connection has been established to [${node.options.identifier}]`, "ready")
    })

    .on("nodeDisconnect", (node, error) => {
        client.logger.log(`[LAVALINK] Lost connection to "${node.options.identifier}" due to an error: ${error.message}`, "error")
    })

    .on("nodeError", (node, error) => {
        client.logger.log(`[LAVALINK] Node "${node.options.identifier}" has encountered an error: ${error.message}`, "error")
    })

    module.exports = {
        name: "ErelaEvents",
      };