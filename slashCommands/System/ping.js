const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Sends the client's ping",
    usage: "/ping",
    permission: "ADMINISTRATOR",
    cooldown: 5,
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @param {Message} message
     */
    async execute(interaction, client) {
        try {
            const Response = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`🏓 ${client.ws.ping}ms`);
            interaction.reply({
                embeds: [Response]
            })
        } catch (error) {
            interaction.reply("Some Error Occured");
            client.logger.log(error, "error")
        }
    }
}