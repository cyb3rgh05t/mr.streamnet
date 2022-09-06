const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const { convertTime } = require('../../src/functions/convert');
const { progressbar } = require('../../src/functions/progressbar')

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

        const player = interaction.client.manager.get(interaction.guildId);

        if (!player) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("<:rejected:995614671128244224> Es wird gerade keine Musik gespielt");
            return interaction.editReply({
                    embeds: [thing]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
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
        });
    }
};