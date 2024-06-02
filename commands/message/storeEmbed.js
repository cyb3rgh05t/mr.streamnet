const { Client, Message, Formatters, MessageEmbed } = require("discord.js");

module.exports = {
  name: "storelink",
  description: "store link embed",
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
      const msg = new MessageEmbed()
      .setColor("DARK_BUT_NOT_BLACK")
      //.setTitle("Spenden Optionen")
      .addFields([{
               
                name: "<:store:1246867439619145902> StreamNet Store",
                value: `
                <:icon_reply:993231553083736135>Downloader App Code: 804370
				<:icon_reply:993231553083736135>[Download Link](https://aftv.news/804370)
                `

            }
            
    ])
      message.channel.send({
             embeds: [msg]
        });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
}