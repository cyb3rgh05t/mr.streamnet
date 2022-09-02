const mongoose = require("mongoose");

const settings = mongoose.Schema({
  GuildID: {
    type: String,
  },
  Prefix: {
    type: String,
    default: client.config.prefix,
  },
});

module.exports = mongoose.model("guild_settings", settings);