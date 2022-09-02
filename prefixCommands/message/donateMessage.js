const { Client, Message } = require("discord.js");
const colors = require("colors");

module.exports = {
    name: "donate-message",
    description: "donate-message",
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
        message.channel.send({ content: `🚨 **HELP2STAYONLINE** 🚨\n\n**StreamNet** is mein **Hobby**, doch habe ich und werde noch viel **Arbeit** reinstecken, deshalb bitte ich euch User mir manschmal zu helfen in dem ihr spendet damit die **Server** und **Premium Accounts** der Indexer bezahlt werden koennen, um euch das **beste Erlebnis** zu präsentieren <:streamnet:855771751820296232>\n\n➡️  Die Server Wartungen und Accounts kommen auf ungefähr 120-130 € im Monat, diese möchte ich gerne so gut wie möglich durch Spenden abgedeckt haben.\n\n➡️  Um eine Spende zu betätigen bitte ich euch über folgende Optionen zu spenden:\n\n**Skrill** : \`adresse per DM anfrage\`\n\n**PaySafeCard** : \`Deutschland oder Luxemburg\`\n\n**BitCoin** : \`adresse per DM anfrage\`\n\n➡️  nach Betätigung der Spende bitte **<@408885990971670531>** anschreiben und posten.\n\n➡️  Ist es die erste Spende für die Server Einladung <#825352124547989544> wird euch die **StreamNet..er** Rolle vergeben.\n\n➡️  Nach einer weiteren Spende werde ich euch eine **Supporter** Rolle vergeben. *(kann bis zu 24h dauern)*\n\nDurch diese Rolle sehe ich dass euch StreamNet gefällt und richtig bei Gelegenheit unterstützt.\n\n**Ich bedanke mich herzlich für den Support.** <:streamnet:855771751820296232>`});
      } catch (error) {
        message.channel.send("Some Error Occured");
        console.log(`[ERROR]`.red.bold, error)
        }
    } 
}