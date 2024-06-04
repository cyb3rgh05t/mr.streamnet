const { Client, Message, Formatters, MessageEmbed } = require("discord.js");

module.exports = {
  name: "paylink",
  description: "donate channel payment links embed",
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
      .setTitle("STREAMNET TV - ABO PREISE")
      .addFields([{
               
                name: "<:s_tv:1246364714968023151> 1 Jahr + 2 Geräte",
                value: `
                <:icon_reply:993231553083736135>150€
                `

            },
			{
               
                name: "<:s_tv:1246364714968023151> 1 Jahr + 1 Geräte",
                value: `
                <:icon_reply:993231553083736135>100€
                `

            },
			{
               
                name: "<:s_tv:1246364714968023151> 6 Monate + 1 Geräte",
                value: `
                <:icon_reply:993231553083736135>55€
                `

            },
			{
               
                name: "<:s_tv:1246364714968023151> 1 Monat + 1 Geräte",
                value: `
                <:icon_reply:993231553083736135>10€
                `

            },
			{
               
                name: "+ pro Gerät",
                value: `
                <:icon_reply:993231553083736135>50€
                `

            },
			{
               
                name: "💗 PAYPAL",
                value: `
                <:icon_reply:993231553083736135>[PayPal.me](https://paypal.me/IveFlammang)
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