const {
    MessageEmbed,
    CommandInteraction,
    Client
} = require("discord.js")
const {
    convertTime
} = require('../../utils/convert.js');
const {
    progressbar
} = require('../../utils/progressbar.js')

module.exports = {
    name: "nowplaying",
    description: "Show the current playing song",
    usage: "/nowplaying",
    public: true,

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {

        await interaction.deferReply({
            ephemeral: false
        });
        const member = interaction.member;

        const player = client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return interaction.reply({
                embeds: [thing]
            });
        }

        const song = player.queue.current
        var total = song.duration;
        var current = player.position;

        let embed = new MessageEmbed()
            .setDescription(`🎶 **Now Playing**\n[${song.title}](${song.uri}) - \`[${convertTime(song.duration)}]\`- [${member}] \n\n\`${progressbar(player)}\``)
            .setThumbnail(song.displayThumbnail("3"))
            .setColor("DARK_BUT_NOT_BLACK")
            .addFields({
                name: "\u200b",
                value: `\`${convertTime(current)} / ${convertTime(total)}\``
            })
        return interaction.editReply({
            embeds: [embed]
        })

    }
};