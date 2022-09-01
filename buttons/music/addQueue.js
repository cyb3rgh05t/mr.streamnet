const {
    MessageActionRow,
    MessageButton,
    Modal,
    MessageEmbed,
    ButtonInteraction,
    Client,
    TextInputComponent
} = require("discord.js");
const {
    ownerId
} = require("../../src/config/config.json");
const DB = require("../../src/databases/musicDB");

module.exports = {
    id: "queueAdd",
    public: true,
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */


    async execute(interaction, client) {

        const player = client.manager.get(interaction.guildId);

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const requester = dbFound.requesterId

        if (interaction.user.id !== requester && interaction.user.id !== ownerId) {
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
                },
                setTimeout(() => interaction.deleteReply(), 5000));
        }

        const InputField = new TextInputComponent()
            .setCustomId("addMusic_input")
            .setLabel("Song Namen, URL oder PlayList URL")
            .setRequired(true)
            .setStyle("SHORT")


        const addMusicRow = new MessageActionRow().addComponents(InputField)

        const modal = new Modal()
            .setCustomId("addMusic_modal")
            .setTitle("Song hinzufügen")
            .addComponents(addMusicRow)

        await interaction.showModal(modal)


    }
}