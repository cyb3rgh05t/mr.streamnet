const {
    CommandInteraction,
    MessageEmbed,
    Client
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "queue",
    description: "Show current queue",
    usage: "/queue",
    public: true,

    /**
     * @param {CommandInteraction} interaction 
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

        if (!player.playing) return interaction.editReply({
                embeds: [new MessageEmbed().setColor("DARK_RED").setDescription("❌ There is nothing in the queue.")]
            },
            setTimeout(() => interaction.deleteReply(), 3000));
        if (!player.queue.length) return interaction.editReply({
                embeds: [new MessageEmbed().setColor("DARK_RED").setDescription("❌ There is nothing in the queue.")]
            },
            setTimeout(() => interaction.deleteReply(), 3000));

        const queue = player.queue.map((t, i) => `\`${++i}.\` **${t.title}** [${t.requester}]`);
        const chunked = util.chunk(queue, 100).map(x => x.join("\n"));

        const queueEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle(`🎶 Current queue for ${guild.name}`)
            .setDescription(chunked[0])

        return interaction.editReply({
            embeds: [queueEmbed]
        })
    }
}