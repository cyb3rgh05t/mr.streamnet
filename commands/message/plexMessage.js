const { Client, Message } = require("discord.js");

module.exports = {
  name: "plex",
  description: "plex channel message",
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
        content: `=======================================\n\n**Willkommen bei <:streamnet:1033460420587049021> StreamNet Plex - Ein täglich upgedateter Deutsch/Englisch Plex Media Server.**\n\n=======================================\n\n➡️  Wie bekomme ich Zutritt zum **StreamNet Plex** ?\n\n**1. **Befolge die Anweisungen für eine **EINLADUNG** in <#825352124547989544> !\n\n**3. **Folge den Anweisungen vom **<@825635238188285952>** !\n\n**4. **Akzeptiere die **PLEX-EINLADUNG** für StreamNet in deiner **PLEX EMAIL BOX**!\n    (für manuelle Aktivierung <#864928903000227850> )\n\nViel Spass beim streamen.. <:streamnet:1033460420587049021>`
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}