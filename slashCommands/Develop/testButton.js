const {
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: "testbutton",
    description: "Test the button handler",
    usage: "/testbutton",
    permission: "ADMINISTRATOR",
    async execute(interaction) {
        try {
            const row = new MessageActionRow();
            row.addComponents(
                new MessageButton()
                .setCustomId("hello")
                .setLabel("HELLO")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("bye")
                .setLabel("BYE")
                .setStyle("DANGER")
            )

            interaction.reply({
                components: [row]
            })
        } catch (error) {
            errorEmbed.setDescription(`An error has occurred\n\`${error}\``)
            return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                }),
                client.logger.log(error, "error")
        }
    }
}