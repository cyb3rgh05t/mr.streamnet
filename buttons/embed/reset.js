const { MessageActionRow, MessageButton, Modal, MessageEmbed, ButtonInteraction, Client } = require("discord.js");
const db = require("../../src/databases/embedDB");

module.exports = {
    id: "ce_reset",
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

        db.findOne({messageId: i.message.id, userId: m.id}, async (err, data) => {
            if(err) throw err;
            if(!data) return interaction.reply({content: "Dieses Menü gehört nicht dir!", ephemeral: true}).catch((err) => console.error(err.message));
        

            i.message.edit({
                embeds: [ShowEmbed, PrevEmbed.setTitle(" ").setDescription("\u200b").setAuthor({name: " "}).setFooter({text: " "}).setFields().setColor("GREY")], 
                components: [mRow1, mRow2, mRow3]
            }).catch((err) => console.error(err.message));
            
        
            interaction.reply({content: "Embed zurückgesetzt!", ephemeral: true}).catch((err) => console.error(err.message));
        
        
        })
        


    }
}