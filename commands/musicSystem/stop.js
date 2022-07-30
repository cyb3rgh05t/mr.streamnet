const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "stop",
    description: "Stop song",
    usage: "/stop",
    public: true,
    
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        player.destroy()

            const disconnectEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription("⏹️  Disconnected.")
            return interaction.reply({ embeds: [disconnectEmbed] })
    }
}