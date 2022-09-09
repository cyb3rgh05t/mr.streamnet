const client = require("../../src/index");

module.exports = {
    name: "nodeDisconnect",
};

client.manager

    .on("nodeDisconnect", (node, error) => {
        client.logger.log(`[LAVALINK] Node lost connection to "${node.options.identifier}" due to an error: ${error.message}`, "error")
    })
