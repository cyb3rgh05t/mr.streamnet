const {
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: "testpremium",
    description: "Test the premium command",
    usage: "/testpremium",
    permission: "ADMINISTRATOR",
    premium: true,
    async execute(interaction) {
        try {
            const row = new MessageActionRow();
            row.addComponents(
                new MessageButton()
                .setCustomId("hello")
                .setLabel("HELLO")
                .setStyle("DANGER"),
                new MessageButton()
                .setCustomId("bye")
                .setLabel("Bye")
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