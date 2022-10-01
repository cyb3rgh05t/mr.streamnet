const client = require("../../src/index");

module.exports = {
    name: "nodeConnect",
};

client.manager

    .on("nodeConnect", (node) => {
        client.logger.log(`[LAVALINK] Node Connection has been established to "${node.options.identifier}"!`, "log")
        client.logger.log(`[LAVALINK] Node "${node.options.name}" is online`, "ready")
    })