const { Client, MessageActionRow, MessageButton, Modal, MessageEmbed, ButtonInteraction, TextInputComponent } = require("discord.js");
const db = require("../../src/databases/embedDB");

module.exports = {
    id: "send",
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

            const channel = g.channels.cache.get(data.finalChannel);
            if (!channel) return i.channel.send({
                content: "Channel doesnt exist, or i do not have enough permissions"
            }).catch((err) => console.error(err.message));

            await i.reply({
                content: `Embed send to ${channel}!`,
                ephemeral: true
            }).catch((err) => console.error(err.message));
            await channel.send({
                embeds: [PrevEmbed]
            }).catch((err) => console.error(err.message));
            await db.deleteOne({
                messageId: i.message.id,
                userId: m.id
            })
            i.message.delete();

        })



    }
}