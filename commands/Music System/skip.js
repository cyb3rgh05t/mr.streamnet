const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "skip",
    description: "Skip song",
    usage: "/skip",
    public: true,
    
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
     async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: false
          });
        const player = client.manager.get(interaction.guildId);

        if (!player.playing) return interaction.editReply({ content: "There is nothing in the queue." })
        await player.stop();

        const skipEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription(`⏭️  **Skipped**`)

        return interaction.editReply({ embeds: [skipEmbed] });
    }
}