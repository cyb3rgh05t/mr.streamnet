const { Client, Message } = require("discord.js");

module.exports = {
  name: "lines",
  description: "lines channel message",
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
        content: `=======================================\n\nBist du an einer Test Linie für unseren **LiveTV Service** interressiert?\nDann wende dich bitte hier an <@408885990971670531> oder in Telegram am [@cyb3rgh05t_01](https://t.me/cyb3rgh05t_01).`
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}