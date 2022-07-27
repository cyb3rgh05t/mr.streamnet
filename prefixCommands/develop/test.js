const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "test",
    description: "test prefixcommand",
    category: "develop",
    syntax: "command",
    permissions: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        message.channel.send({ content: "Hello World..." })
    }
}
