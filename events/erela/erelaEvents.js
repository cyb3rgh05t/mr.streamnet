const client = require("../../src/index");
const colors = require("colors");

client.manager
    .on("nodeConnect", (node) => {
        console.log(`[LAVALINK]`.green.bold, `| Connection has been established to "${node.options.identifier}".`)
    })

    .on("nodeDisconnect", (node, error) => {
        console.log(`[LAVALINK]`.red.bold, `| Lost connection to "${node.options.identifier}" due to an error: ${error.message}.`)
    })

    .on("nodeError", (node, error) => {
        console.log(`[LAVALINK]`.red.bold, `| Node "${node.options.identifier}" has encountered an error: ${error.message}.`)
    })

    module.exports = {
        name: "ErelaEvents",
      };