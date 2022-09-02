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
}