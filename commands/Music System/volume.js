const {
    CommandInteraction,
    MessageEmbed,
    Client
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "volume",
    description: "Alter the volume",
    usage: "/volume [percent]",
    public: true,
    options: [{
        name: "percent",
        description: "10 = 10%",
        type: "NUMBER",
        required: true
    }],
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

        const volume = options.getNumber("percent");
        if (!player.playing) return interaction.editReply({
            content: "There is nothing in the queue."
        })
        if (volume < 0 || volume > 100) return interaction.editReply({
            content: `You can only set the volume from 0 to 100.`
        })
        player.setVolume(volume);

        const volumeEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription(`🔈 Volume has been set to **${player.volume}%**.`)
        return interaction.editReply({
            embeds: [volumeEmbed]
        })

    }
}