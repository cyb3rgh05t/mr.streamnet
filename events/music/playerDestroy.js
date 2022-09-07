const { client } = require("../../src/index")

module.exports = {
    name: "playerDestroy",
    execute() {
        client.logger.log("Player destroyed", "log");
    },
};