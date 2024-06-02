const { Client, Message, Formatters } = require("discord.js");

module.exports = {
  name: "appstore",
  description: "appstore channel message",
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
        content: `=======================================\n\n<:store:1246867439619145902> **StreamNet Store**\n\nHol dir unseren App Store direkt auf dein Android Gerät, lade dir deine lieblings **StreamNet TV App** runter und geniesse das streaming Erlebnis.`
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}