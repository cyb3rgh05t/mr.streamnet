const {
    CommandInteraction,
    MessageEmbed,
    Client
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "resume",
    description: "Resume song",
    usage: "/resume",
    permission: "ADMINISTRATOR",

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: false
        });

        const player = interaction.client.manager.get(interaction.guildId);

        await player.pause(false);

        const song = player.queue.current;

        const resumeEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription(`▶️ **Resumed**\n\n[${song.title}](${song.uri})`)
        return interaction.editReply({
            embeds: [resumeEmbed]
        })

    }
}