const { ButtonInteraction, Client, MessageEmbed } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();


module.exports = {
    id: "lyrics",
    permission: "ADMINISTRATOR",
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: false
          });
        const member = interaction.member;

        const player = client.manager.get(interaction.guildId);

        const track = player.queue.current;
        const trackTitle = track.title.replace("(Official Video)", "").replace("(Official Audio)", "");              
        const actualTrack = await gClient.songs.search(trackTitle);
        const searches = actualTrack[0];
        const lyrics = await searches.lyrics();

        const lyricsEmbed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setTitle(`💭  Lyrics for **${trackTitle}**`)
        .setDescription(lyrics)
        .setThumbnail(track.displayThumbnail("3"))
        return interaction.editReply({ embeds: [lyricsEmbed] }) 
    }
}