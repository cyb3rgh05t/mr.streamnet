const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "resume",
    description: "Resume song",
    usage: "/resume",
    public: true,
    
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        await player.pause(false);

        const resumeEmbed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setDescription("▶️ Resumed")
        return interaction.reply({ embeds: [resumeEmbed] })

    }
}