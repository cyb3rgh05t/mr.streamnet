const client = require("../index");
const mongoose = require("mongoose");

const commands = mongoose.Schema({
  GuildID: String,
  cmds: Array,
});

module.exports = mongoose.model("commands", commands);