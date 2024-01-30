const { ButtonInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        if (!interaction.isButton()) return;

        const button = client.buttons.get(interaction.customId);

        if (!button)
            return;

        if (button.permission && !interaction.member.permissions.has(button.permission))
            return interaction.reply({
                content: `You do not have the required permission for this command: \`${interaction.customId}\`.`,
                ephemeral: true
            })

        if (button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
            return interaction.reply({
                content: "You are not the owner.",
                ephemeral: true
            });

        button.execute(interaction, client);

    }
}