const { Client, Message } = require("discord.js");

module.exports = {
  name: "discord-image",
  description: "discord-image",
  category: "logos",
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
        files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Discord/SNC_DISCORD.png.png?raw=true"]
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}