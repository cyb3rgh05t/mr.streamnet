const { Client, Message } = require("discord.js");

module.exports = {
  name: "ticket",
  description: "ticket setup channel message",
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
        content: `⚙️ **SUPPORT**\n<:icon_reply:993231553083736135> jeglicher Support für Plex oder StreamNet.\n\n🎟️ **INVITE ANFRAGE**\n<:icon_reply:993231553083736135> wie das Button Label schon sagt - Anfrage Button für eine StreamNet Einladung.\n\n<:movie:997600641956454522> **MEDIA**\n<:icon_reply:993231553083736135> Probleme wie : Falsche Tonspuren, Schlechter Ton, Schlechte Qualität, usw.....`
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}