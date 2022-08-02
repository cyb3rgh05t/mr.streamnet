const { ButtonInteraction, Client, MessageEmbed } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();


module.exports = {
    id: "skipMusic",
    public: true,
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const player = client.manager.get(interaction.guildId);

        if (!player.playing) return interaction.reply({ content: "There is nothing in the queue.", ephemeral: true })
        if (!player.queue.length) return interaction.reply({ content: "There is nothing in the queue.", ephemeral: true });
        await player.stop()

        const skipEmbed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setDescription(`⏭️  **Skipped**`)
            return interaction.reply({ embeds: [skipEmbed]},
            setTimeout(() => interaction.deleteReply(), 3000));

    }
}