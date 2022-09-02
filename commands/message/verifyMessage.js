<<<<<<< Updated upstream:prefixCommands/message/verifyMessage.js
const { Client, Message } = require("discord.js");
const colors = require("colors");

module.exports = {
    name: "verify-message",
    description: "verify-message",
    category: "message",
    syntax: "command",
    permissions: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
     run: async(client, message, args) => {
      try {
        message.channel.send({ content: `➡️ ... warte bis du vom Admin verifiziert wurdest ✅\n\n➡️ bitte erfülle das CAPTCHA in deinen DM's ...`});
      } catch (error) {
        message.channel.send("Some Error Occured");
        console.log(`[ERROR]`.red.bold, error)
        }
    } 
=======
const {
  Client,
  Message
} = require("discord.js");

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
        content: `➡️ ... warte bis du vom Admin verifiziert wurdest ✅\n\n➡️ bitte erfülle das CAPTCHA in deinen DM's ...`
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
>>>>>>> Stashed changes:commands/message/verifyMessage.js
}