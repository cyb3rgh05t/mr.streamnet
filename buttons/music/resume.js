const { ButtonInteraction, Client, MessageEmbed } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();


module.exports = {
    id: "resumeMusic",
    permission: "ADMINISTRATOR",
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        await player.pause(false);

       const song = player.queue.current;

       const resumeEmbed = new MessageEmbed()
       .setColor("DARK_BUT_NOT_BLACK")
       .setDescription(`▶️ **Resumed**\n\n[${song.title}](${song.uri})`)
       return interaction.reply({ embeds: [resumeEmbed], ephemeral: true })
    }
}