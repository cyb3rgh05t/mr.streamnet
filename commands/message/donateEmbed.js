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
      //.setTitle("Spenden Optionen")
      .addFields([{
               
                name: "💗 PAYPAL",
                value: `
                <:icon_reply:993231553083736135>[PayPal.me](https://paypal.me/IveFlammang)
                `

            },
            {
               
                name: "💗 BITCOIN",
                value: `
                <:icon_reply:993231553083736135>\`bc1q79d8u595z5fjdmege7pvzgtxwrsrhtgl7yajf5\`
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