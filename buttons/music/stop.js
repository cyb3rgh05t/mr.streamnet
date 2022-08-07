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
    id: "stopMusic",
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

        if (interaction.user.id !== requester) {
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription(`❌ Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
                },
                setTimeout(() => interaction.deleteReply(), 5000));
        }

        player.destroy()

        const disconnectEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription("⏹️  **Disconnected**")
        return interaction.reply({
            embeds: [disconnectEmbed],
            ephemeral: false
        })
    }
}