const { Client, Message } = require("discord.js");

module.exports = {
  name: "channels",
  description: "tv channel message",
  category: "message",
  syntax: "command",
  permission: "ADMINISTRATOR",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      message.channel.send({
        content: `=======================================\n\nHier findest du eine Übersicht unserer LiveTV Channels:`
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}