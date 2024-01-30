const { Client, ButtonInteraction } = require("discord.js");
const DB = require("../../src/databases/pollDB");

module.exports = {
    id: "poll-5",
    permission: "SEND_MESSAGES",
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const data = await DB.findOne({
            GuildID: interaction.guild.id,
            MessageID: interaction.message.id
        })
        if (!data) return;

        if (data.Users.includes(interaction.user.id)) return interaction.reply({
            content: `Du hast bereits eine Stimme abgegeben!`,
            ephemeral: true
        });

        await DB.findOneAndUpdate({
            GuildID: interaction.guild.id,
            MessageID: interaction.message.id
        }, {
            Button5: data.Button5 + 1,
            $push: {
                Users: interaction.user.id
            }
        });

        interaction.reply({
            content: `Deine Stimme wurde gespeichert!`,
            ephemeral: true
        });
    }
}