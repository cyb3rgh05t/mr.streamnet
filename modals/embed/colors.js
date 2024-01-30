const {Client, MessageActionRow, MessageButton, Modal, MessageEmbed, ModalSubmitInteraction, TextInputComponent } = require("discord.js");
const db = require("../../src/databases/embedDB");

module.exports = {
    id: "ce_color_modal",
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
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
        const input = i.fields.getTextInputValue("ce_color_modal_input");
        if (!input.match(/[0-9A-Fa-f]{6}/g)) return interaction.reply({
            content: "Incorrect Color code!\nPlease use a HEX-code, find it [here](https://www.farb-tabelle.de/de/farbtabelle.htm)!",
            ephemeral: true
        });

        interaction.reply({
            content: "Color set successful!",
            ephemeral: true
        }).catch((err) => console.error(err.message))


        interaction.message.edit({
            embeds: [ShowEmbed, PrevEmbed.setColor(`${input}`)],
            components: [mRow1, mRow2, mRow3]
        }).catch((err) => console.error(err.message))


    }
}