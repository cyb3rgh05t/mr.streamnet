const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const { convertTime } = require('../../src/functions/convert');
const { progressbar } = require('../../src/functions/progressbar');

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
        
        const { options, member, guild } = interaction;

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

        const track = player.queue.current;
        var total = track.duration;
        var current = player.position;

        let embed = new MessageEmbed()
            .setAuthor({
                    name: "Now Playing",
                    iconURL: member.user.avatarURL({
                        dynamic: true
                    }),
                })
            .setDescription(`[${track.title}](${track.uri}) [${player.queue.current.requester}]\n\`${convertTime(player.position)}\` ${progressbar(player)} \`${convertTime(player.queue.current.duration)}\``)
            .setColor("DARK_BUT_NOT_BLACK")
        return interaction.editReply({
            embeds: [embed]
        });
    }
};