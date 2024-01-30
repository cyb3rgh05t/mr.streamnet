const { Client, Message } = require("discord.js");

module.exports = {
  name: "invite-image",
  description: "invite-image",
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
        files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Discord/SNC_INVITES.png?raw=true"]
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}