const { ButtonInteraction, Client, MessageEmbed } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();


module.exports = {
    id: "pauseMusic",
    permission: "ADMINISTRATOR",
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
             .setColor("RED")
             .setDescription("There is no music playing.");
            return interaction.reply({ embeds: [thing], ephemeral: true }); 
        }

        if (player.paused) {
            let thing = new MessageEmbed()
              .setColor("RED")
              .setDescription(`⏸️ The player is already paused.`)
            return interaction.reply({ embeds: [thing], ephemeral: true });
          }

        await player.pause(true)

        const song = player.queue.current;

        let thing = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")  
        .setDescription(`⏸️ **Paused**\n\n[${song.title}](${song.uri})`)
            return interaction.reply({ embeds: [thing]},
            setTimeout(() => interaction.deleteReply(), 3000));

    }

}