const {
    MessageActionRow,
    MessageButton,
    Modal,
    MessageEmbed,
    ButtonInteraction,
    Client,
    TextInputComponent
} = require("discord.js");

module.exports = {
    id: "playMusic",
    public: true,
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const InputField = new TextInputComponent()
            .setCustomId("playMusic_input")
            .setLabel("Song Namen, URL oder PlayList URL")
            .setRequired(true)
            .setStyle("SHORT")


        const playMusicRow = new MessageActionRow().addComponents(InputField)

        const modal = new Modal()
            .setCustomId("playMusic_modal")
            .setTitle("Music System")
            .addComponents(playMusicRow)

        await interaction.showModal(modal)


    }
}