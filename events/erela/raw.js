const client = require("../../src/index");

client.on("raw", (d) => client.manager.updateVoiceState(d));

module.exports = {
    name: "ErelaRaw",
  };