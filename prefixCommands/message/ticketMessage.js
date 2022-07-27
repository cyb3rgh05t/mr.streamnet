const { Client, Message } = require("discord.js");
const colors = require("colors");

module.exports = {
    name: "ticket-message",
    description: "ticket-message",
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
        message.channel.send({ content: `⚙️ **SUPPORT**\n<:icon_reply:993231553083736135> jeglicher Support für Plex oder StreamNet.\n\n🎟️ **INVITE ANFRAGE**\n<:icon_reply:993231553083736135> wie das Button Label schon sagt - anfrage Button für eine StreamNet Einladung.\n\n<:movie:997600641956454522> **MEDIA**\n<:icon_reply:993231553083736135> Probleme wie : Falsche Tonspuren, Schlechter Ton, Schlechte Qualität, usw.....`});
      } catch (error) {
        message.channel.send("Some Error Occured");
        console.log(`[ERROR]`.red.bold, error)
        }
    } 
}
