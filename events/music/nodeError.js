const client = require("../../src/index");

module.exports = {
    name: "nodeError",
};

client.manager

    .on("nodeError", (node, error) => {
        client.logger.log(`[LAVALINK] Node "${node.options.identifier}" has encountered an error: ${error.message}`, "error")
    })