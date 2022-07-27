const mongoose = require("mongoose");

const poll = mongoose.Schema({
  GuildID: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },

  ChannelID: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },

  MessageID: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },

  CreatedBy: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },

  Users: {
    type: [mongoose.SchemaTypes.String],
    default: null,
  },

  Title: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },

  Button1: {
    type: mongoose.SchemaTypes.Number,
    default: null,
  },

  Button2: {
    type: mongoose.SchemaTypes.Number,
    default: null,
  },

  Button3: {
    type: mongoose.SchemaTypes.Number,
    default: null,
  },

  Button4: {
    type: mongoose.SchemaTypes.Number,
    default: null,
  },

  Button5: {
    type: mongoose.SchemaTypes.Number,
    default: null,
  },

});

module.exports = mongoose.model("poll", poll);