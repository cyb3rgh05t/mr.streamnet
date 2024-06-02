const { Client, Message } = require("discord.js");

module.exports = {
  name: "tv",
  description: "livetv channel message",
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
        content: `=======================================\n\n**Willkommen bei <:s_tv:1246364714968023151> StreamNet TV - Ein All-In One IPTV Service.**\n\n=======================================\n\n➡️  Wie bekomme ich Zutritt zu **StreamNet TV** ?\n\n**1. **Befolge die Anweisungen für eine **TEST-LINIE** in <#1246173649124200518> !\n\n\n\nViel Spass beim streamen.. <:s_tv:1246364714968023151>`
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}