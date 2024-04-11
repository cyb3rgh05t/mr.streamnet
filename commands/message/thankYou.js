const { Client, Message, Formatters } = require("discord.js");

module.exports = {
  name: "thankyou",
  description: "thankyou",
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
      const msg = Formatters.hyperlink("PayPal", "https://paypal.me/IveFlammang");
      message.channel.send({
        content: ` ‼️ **SEHR WICHTIG BEI PAYPAL SPENDEN** ‼️ - **UNBEDINGT** über **FREUNDE und FAMILLIE** spenden und **NICHT** als **DIENSTLEISTUNG** spenden.\n\nIch bedanke mich für den Support <:streamnet:1033460420587049021>`
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}