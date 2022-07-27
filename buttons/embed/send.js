const { MessageActionRow, MessageButton, Modal, MessageEmbed, ButtonInteraction, Client, TextInputComponent } = require("discord.js");
const db = require("../../src/databases/embedDB");

module.exports = {
    id: "ce_send",
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
            
            const channel = g.channels.cache.get(data.finalChannel);
            if(!channel) return i.channel.send({content: "Dieser Kanal existiert nicht, oder ich verfüge nicht über genügend Berechtigungen!"}).catch((err) => console.error(err.message));
            
            await i.reply({content: `Embed wurde erfolgreich in ${channel} gesendet!`, ephemeral: true}).catch((err) => console.error(err.message));
            await channel.send({embeds: [PrevEmbed]}).catch((err) => console.error(err.message));
            await db.deleteOne({messageId: i.message.id, userId: m.id})
            i.message.delete();

        })
        


    }
}