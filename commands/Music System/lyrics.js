const {
    CommandInteraction,
    MessageEmbed,
    Client
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "lyrics",
    description: "Karaoke",
    usage: "/lyrics",
    permission: "ADMINISTRATOR",

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const player = client.manager.get(interaction.guildId);

        const track = player.queue.current;
        const trackTitle = track.title.replace("(Official Video)", "").replace("(Official Audio)", "");
        const actualTrack = await gClient.songs.search(trackTitle);
        const searches = actualTrack[0];
        const lyrics = await searches.lyrics();

        const lyricsEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle(`💬  Lyrics for **${trackTitle}**`)
            .setDescription(lyrics)
            .setThumbnail(track.displayThumbnail("3"))
        return interaction.reply({
            embeds: [lyricsEmbed]
        })
    }
}