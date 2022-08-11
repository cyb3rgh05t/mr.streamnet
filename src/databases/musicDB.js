const mongoose = require("mongoose");

const music = new mongoose.Schema({

  guildId: String,
  channelId: String,
  messageId: String,
  requesterId: String,
  queueId: String,
  voiceChannelId: String,
  volume: String

});

module.exports = mongoose.model("music", music);