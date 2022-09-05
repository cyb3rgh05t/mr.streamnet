const { Client, ButtonInteraction, MessageEmbed } = require("discord.js");
const client = require('../../src/index');
const util = require("../../src/utils/util");
const DB = require("../../src/databases/musicDB");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

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

        const player = interaction.client.manager.get(interaction.guildId);

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const requester = dbFound.requesterId

        if (interaction.user.id !== requester && interaction.user.id !== client.config.ownerId) {
            return interaction.editReply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        }
        try {
            const track = player.queue.current;
            const trackTitle = track.title.replace("(Official Video)", "").replace("(Official Audio)", "");
            const actualTrack = await gClient.songs.search(trackTitle);
            const searches = actualTrack[0];
            const lyrics = await searches.lyrics();

            const lyricsEmbed = new MessageEmbed()
                .setColor("DARK_BUT_NOT_BLACK")
                .setTitle(`💬 Lyrics\n**${trackTitle}**`)
                .setDescription(lyrics)
                .setThumbnail(track.displayThumbnail("3"))
            member.send({
                embeds: [lyricsEmbed]
            });

            return interaction.editReply({
                embeds: [new MessageEmbed().setColor("GREEN").setDescription(`<:approved:995615632961847406> Lyrics wurden dir als PM gesendet!`)]
            }, setTimeout(() => interaction.deleteReply(), 3000));
        } catch (_err) {
            const track = player.queue.current;
            const noLyrics = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `<:rejected:995614671128244224> Keine Lyrics gefunden für\n**[${track.title}](${track.uri})**.`
                )

            return interaction.editReply({
                embeds: [noLyrics]
            }, setTimeout(() => interaction.deleteReply(), 3000));
        }
    }
}