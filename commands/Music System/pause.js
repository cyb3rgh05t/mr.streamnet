const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "pause",
    description: "Pause song",
    usage: "/pause",
    public: true,
    
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        if (!player.playing) return interaction.reply({ content: "There is nothing in the queue." })

        await player.pause(true);

        const pauseEmbed = new MessageEmbed()
            .setColor("#303236")
            .setDescription("⏸️  Paused.")
        return interaction.reply({ embeds: [pauseEmbed] })
    }
}