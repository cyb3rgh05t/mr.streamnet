const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "testbutton",
    description: "Test the button handler",
    usage: "/testbutton",
    permission: "ADMINISTRATOR",
    execute(interaction) {

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

        interaction.reply({components: [row]});

    }
}