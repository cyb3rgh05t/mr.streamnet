const { Client, MessageActionRow, MessageButton, Modal, MessageEmbed, ButtonInteraction, TextInputComponent } = require("discord.js");
const db = require("../../src/databases/embedDB");

module.exports = {
    id: "addField",
    permission: "MANAGE_MESSAGES",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const i = interaction;
        const m = i.member;
        const g = i.guild;
        const c = i.channel;
        const ShowEmbed = i.message.embeds[0];
        const PrevEmbed = i.message.embeds[1];
        const mRow1 = i.message.components[0];
        const mRow2 = i.message.components[1];
        const mRow3 = i.message.components[2];

        db.findOne({
            messageId: i.message.id,
            userId: m.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) return interaction.reply({
                content: "You are not the Owner!",
                ephemeral: true
            }).catch((err) => console.error(err.message));

            if (PrevEmbed.fields.length == 25) return interaction.reply({
                content: "Reached maximum of Fields! (25x)",
                ephemeral: true
            }).catch((err) => console.error(err.message));

            const InputField = new TextInputComponent()
                .setCustomId("ce_fieldName_modal_input")
                .setLabel("Field Name!")
                .setMinLength(1)
                .setMaxLength(256)
                .setRequired(true)
                .setStyle("SHORT")

            const InputField2 = new TextInputComponent()
                .setCustomId("ce_fieldValue_modal_input")
                .setLabel("Field Value!")
                .setMinLength(1)
                .setMaxLength(1024)
                .setRequired(true)
                .setStyle("SHORT")


            const FieldNameTextModalInputRow = new MessageActionRow().addComponents(InputField)
            const FieldValueTextModalInputRow = new MessageActionRow().addComponents(InputField2)

            const modal = new Modal()
                .setCustomId("ce_addField_modal")
                .setTitle("Add Field")
                .addComponents(FieldNameTextModalInputRow, FieldValueTextModalInputRow)

            await interaction.showModal(modal)



        })



    }
}