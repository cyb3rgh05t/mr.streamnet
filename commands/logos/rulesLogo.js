const { Client, Message } = require("discord.js");
const colors = require("colors");

module.exports = {
<<<<<<< Updated upstream:prefixCommands/logos/rulesLogo.js
    name: "rules-image",
    description: "rules-image",
    category: "logos",
    syntax: "command",
    permissions: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
     run: async(client, message, args) => {
      try {
        message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_RULES.png.png?raw=true"]});
      } catch (error) {
			  message.channel.send("Some Error Occured");
			  console.log(`[ERROR]`.red.bold, error)
		    }
    } 
=======
  name: "rules-image",
  description: "rules-image",
  category: "logos",
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
        files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_RULES.png.png?raw=true"]
      });
    } catch (error) {
      message.channel.send("Some Error Occured");
      client.logger.log(error, "error")
    }
  }
>>>>>>> Stashed changes:commands/logos/rulesLogo.js
}