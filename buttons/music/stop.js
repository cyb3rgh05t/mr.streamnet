const { ButtonInteraction, Client, MessageEmbed } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();


module.exports = {
    id: "stopMusic",
    permission: "ADMINISTRATOR",
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        player.destroy()

           const disconnectEmbed = new MessageEmbed()
           .setColor("DARK_BUT_NOT_BLACK")
           .setDescription("⏹️  **Disconnected**")
           return interaction.reply({ embeds: [disconnectEmbed], ephemeral: true })
    }
}