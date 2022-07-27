const { Client, Message } = require("discord.js");
const colors = require("colors");

module.exports = {
    name: "invite-message",
    description: "invite-message",
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
        message.channel.send({ content: `**SPENDEN** sind das A und O damit dieses **Projekt** am Leben bleibt.\n\nDeshalb frage ich für jede **Server Einladung** eine kleinde **Spende** um die Server und alles was ansteht zu bezahlen...\n\n➡️  Betätige eine **Spende** indem du den Anweisungen in <#912755161078849598> folgst.\n\n➡️  Nach einer **Spende** eröffne ein **Invite-Ticket** in <#995631213995905094> und frage nach einer **StreamNet Einladung**. Nach Bestätigung des **Staff Teams** wird dir der <@825635238188285952> Bot per **DM** schreiben. Folde diesen Anweisungen.\n\n➡️  **NACHDEM** du hinzugefügt worden bist, kanst du die **EINLADUNG** in deiner **MAILBOX** *(Mailbox der Email welsche du dem Bot angegeben hast)* akzeptieren.\n***(sollte der Link in der email nicht klappen, dann kanst du die Einladung auch manuel akzeptieren. Mehr dazu im  <#864928903000227850>***)`});
        } catch (error) {
          message.channel.send("Some Error Occured");
          console.log(`[ERROR]`.red.bold, error)
          }
      } 
}