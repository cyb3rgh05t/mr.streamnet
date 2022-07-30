const { MessageActionRow, MessageButton, Modal, MessageEmbed, ButtonInteraction, Client, TextInputComponent } = require("discord.js");
const db = require("../../src/databases/embedDB");
    
module.exports = {
    id: "ce_footer",

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
        
        db.findOne({messageId: i.message.id, userId: m.id}, async (err, data) => {
            if(err) throw err;
            if(!data) return interaction.reply({content: "Dieses Menü gehört nicht dir!", ephemeral: true}).catch((err) => console.error(err.message));

            const InputField = new TextInputComponent()
            .setCustomId("ce_footerText_modal_input")
            .setLabel("Gebe hier den Text für die Fußzeile ein!")
            .setMinLength(1)
            .setMaxLength(2048)
            .setRequired(true)
            .setStyle("SHORT")
    
            const InputField2 = new TextInputComponent()
            .setCustomId("ce_footerIcon_modal_input")
            .setLabel("Gebe hier eine URL für das Icon an!")
            .setMinLength(1)
            .setMaxLength(4000)
            .setRequired(false)
            .setStyle("SHORT")
    
            const FooterTextModalInputRow = new MessageActionRow().addComponents(InputField)
            const FooterIconModalInputRow = new MessageActionRow().addComponents(InputField2)
    
            const modal = new Modal()
            .setCustomId("ce_footer_modal")
            .setTitle("Footer")
            .addComponents(FooterTextModalInputRow, FooterIconModalInputRow)
    
            await interaction.showModal(modal)

        })

    
    }
}