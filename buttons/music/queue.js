const {
    ButtonInteraction,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();
const DB = require("../../src/databases/musicDB");


module.exports = {
    id: "queue",
    public: true,

    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: false
        });

        const {
            options,
            member,
            guild
        } = interaction;
        const player = client.manager.get(interaction.guildId);

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const requester = dbFound.requesterId

        if (interaction.user.id !== requester && interaction.user.id !== client.config.ownerId) {
            return interaction.editReply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
                },
                setTimeout(() => interaction.deleteReply(), 5000));
        }

        if (!player.playing) return interaction.editReply({
                embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Es befindet sich nichts in der Warteschlange.")]
            },
            setTimeout(() => interaction.deleteReply(), 3000));
        if (!player.queue.length) return interaction.editReply({
                embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Es befindet sich nichts in der Warteschlange.")]
            },
            setTimeout(() => interaction.deleteReply(), 3000));

        const queue = player.queue.map((t, i) => `\`${++i}.\` **${t.title}** [${member}]`);
        const chunked = util.chunk(queue, 100).map(x => x.join("\n"));

        const queueEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle(`🎶 Aktuelle Playlist für ${guild.name}`)
            .setDescription(chunked[0])


        if (dbFound) await dbFound.updateOne({
            queueId: queueEmbed.id,
        });
        member.send({
            embeds: [queueEmbed]
        });

        return interaction.editReply({
            embeds: [new MessageEmbed().setColor("GREEN").setDescription(`<:approved:995615632961847406> Playlist wurde dir als PM gesendet!`)]
        }, setTimeout(() => interaction.deleteReply(), 3000));


    }
}