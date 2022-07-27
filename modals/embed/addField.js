const { MessageActionRow, MessageButton, Modal, MessageEmbed, ModalSubmitInteraction, Client, TextInputComponent } = require("discord.js");
const db = require("../../src/databases/embedDB");

module.exports = {
    id: "ce_addField_modal",
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
        const input = i.fields.getTextInputValue("ce_fieldName_modal_input");
        const input2 = i.fields.getTextInputValue("ce_fieldValue_modal_input");

        const PrevEmbed2 = new MessageEmbed()

        if(PrevEmbed.title == null) {
            PrevEmbed2.setTitle("  ")
        } else {
            PrevEmbed2.setTitle(`${PrevEmbed.title}`)
        }

        if(PrevEmbed.description.length == 0) {
            PrevEmbed2.setDescription("  ")
        } else {
            PrevEmbed2.setDescription(`${PrevEmbed.description}`)
        }

        if(PrevEmbed.author == null) {
            PrevEmbed2.setAuthor({name: "  "})
        } else {
            if(PrevEmbed.author.iconURL == null) {
                PrevEmbed2.setAuthor({name: `${PrevEmbed.author.name}`})
            } else {
                PrevEmbed2.setAuthor({name: `${PrevEmbed.author.name}`, iconURL: `${PrevEmbed.author.iconURL}`})
            }
        }

        if(PrevEmbed.footer == null) {
            PrevEmbed2.setFooter({text: "  "})
        } else {
            if(PrevEmbed.footer.iconURL == null) {
                PrevEmbed2.setFooter({text: `${PrevEmbed.footer.text}`})
            } else {
                PrevEmbed2.setFooter({text: `${PrevEmbed.footer.text}`, iconURL: `${PrevEmbed.footer.iconURL}`})
            }   
        }

        if(PrevEmbed.thumbnail != null) {
            PrevEmbed2.setThumbnail(`${PrevEmbed.thumbnail.url}`)
        }

        if(PrevEmbed.image != null) {
            PrevEmbed2.setImage(`${PrevEmbed.image.url}`)
        }

        if(PrevEmbed.color != null) {
            PrevEmbed2.setColor(`${PrevEmbed.hexColor}`)
        }
        
        await PrevEmbed.fields.forEach((f) => {
            PrevEmbed2.addField(`${f.name}`, `${f.value}`)
        })

        if(PrevEmbed.fields.find(f => f.name.toLowerCase() == input.toLowerCase())) {
            interaction.reply({content: "Es gibt bereits ein Feld mit diesem Namen!", ephemeral: true});
        } else {

            await PrevEmbed2.addField(`${input}`, `${input2}`)

            await interaction.message.edit({
                embeds: [ShowEmbed, PrevEmbed2],
                components: [mRow1, mRow2, mRow3]
            }).catch((err) => console.error(err.message))

            interaction.reply({content: "Feld erfolgreich hinzugefügt!", ephemeral: true}).catch((err) => console.error(err.message))
        }

    }
}