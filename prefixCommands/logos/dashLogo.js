const { Client, Message } = require("discord.js");
const colors = require("colors");

module.exports = {
    name: "dash-image",
    description: "dash-image",
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
        message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_Dashboard.png?raw=true"]});
      } catch (error) {
			  message.channel.send("Some Error Occured");
		  	console.log(`[ERROR]`.red.bold, error)
		    }
    }  
}