const { prefix } = require("../config/config.json");
const mongoose = require("mongoose");

const settings = mongoose.Schema({
  GuildID: {
    type: String,
  },
  Prefix: {
    type: String,
    default: prefix,
  },
});

module.exports = mongoose.model("guild_settings", settings);