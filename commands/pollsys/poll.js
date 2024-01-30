const { Client, Message } = require("discord.js");
const { poll } = require('../../src/functions/poll');

module.exports = {
  name: 'poll',
  description: 'Create a poll',
  usage: 'Title + Option 1 + Option 2 + Option 3 + etc',
  category: "pollsys",
  syntax: "command",
  permission: "ADMINISTRATOR",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
      poll(message, args, '+', '#171717');
  },
};