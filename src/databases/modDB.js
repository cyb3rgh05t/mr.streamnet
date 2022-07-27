const mongoose = require("mongoose");

const modlogs = mongoose.Schema({
  GuildID: {
    type: mongoose.SchemaTypes.String,
  },
  ChannelID: {
    type: mongoose.SchemaTypes.String,
  },
});

module.exports = mongoose.model("modlogs", modlogs);