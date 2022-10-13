const { Client, Message } = require("discord.js");

module.exports = {
  name: "verify-message",
  description: "verify-message",
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
        content: `➡️ ... warte bis du vom Admin verifiziert wurdest ✅\n\n➡️ bitte erfülle das CAPTCHA in deinen DM's ...\n(❌ Bitte stelle sicher, dass Direktnachrichten aktiviert sind! Du kannst deine Direktnachrichten wieder deaktivieren, sobald du das Captcha abgeschlossen hast.)`,
        files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/discord.png?raw=true"]
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}