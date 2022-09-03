const {
    ButtonInteraction,
    Client,
    MessageEmbed
} = require("discord.js");
const util = require("../../src/utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();
const DB = require("../../src/databases/musicDB");


module.exports = {
    id: "shuffleMusic",
    public: true,

    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const requester = dbFound.requesterId

        if (interaction.user.id !== requester && interaction.user.id !== client.config.ownerId) {
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        }

        if (!player.playing) return interaction.reply({
                embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Es befindet sich nichts in der Warteschlange.")]
            },
            setTimeout(() => interaction.deleteReply(), 3000));
        if (!player.queue.length) return interaction.reply({
                embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Es befindet sich nichts in der Warteschlange.")]
            },
            setTimeout(() => interaction.deleteReply(), 3000));

        player.queue.shuffle()

        const shuffleEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription(`🔀 Playlist wurde gemischt`)
        return interaction.reply({
                embeds: [shuffleEmbed]
            },
            setTimeout(() => interaction.deleteReply(), 3000));
    }
}