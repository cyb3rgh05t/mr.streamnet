const mongoose = require("mongoose");

const musicsystem = new mongoose.Schema({

  guildId: String,
  channelId: String,
  messageId: String,
  requesterId: String,
  queueId: String,
  voiceChannelId: String,
  volume: Number

});

module.exports = mongoose.model("musicsystem", musicsystem);