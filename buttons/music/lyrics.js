const {
    ButtonInteraction,
    Client,
    MessageEmbed
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();
const DB = require("../../src/databases/musicDB");


module.exports = {
    id: "lyrics",
    public: true,

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

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const requester = dbFound.requesterId

        if (interaction.user.id !== requester) {
            return interaction.editReply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
                },
                setTimeout(() => interaction.deleteReply(), 5000));
        }

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
        return interaction.editReply({
            embeds: [lyricsEmbed]
        })
    }
}