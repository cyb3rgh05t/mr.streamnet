const { MessageActionRow, MessageButton, Modal, MessageEmbed, ModalSubmitInteraction, Client, TextInputComponent } = require("discord.js");
const db = require("../../src/databases/embedDB");

module.exports = {
    id: "ce_footer_modal",
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
        const input = i.fields.getTextInputValue("ce_footerText_modal_input");
        const input2 = i.fields.getTextInputValue("ce_footerIcon_modal_input");

        if(input2.length != 0) {
            if(!input2.startsWith("https://")) return interaction.reply({content: "Dies ist keine korrekte URL!", ephemeral: true}).catch((err) => console.error(err.message));
            await interaction.message.edit({
                embeds: [ShowEmbed, PrevEmbed.setFooter({text: `${input}`, iconURL: `${input2}`})],
                components: [mRow1, mRow2, mRow3]
            }).catch((err) => console.error(err.message))

            interaction.reply({content: "Fußzeile erfolgreich gesetzt!", ephemeral: true}).catch((err) => console.error(err.message))

        } else {

            await interaction.message.edit({
                embeds: [ShowEmbed, PrevEmbed.setFooter({text: `${input}`})],
                components: [mRow1, mRow2, mRow3]
            }).catch((err) => console.error(err.message))

            interaction.reply({content: "Fußzeile erfolgreich gesetzt!", ephemeral: true}).catch((err) => console.error(err.message))

        }

        




    }
}