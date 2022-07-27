module.exports = {
    id: "hello",
    permission: "ADMINISTRATOR",
    execute(interaction) {
        interaction.reply({content: "YES! ITS WORKING. HELLO!"})
    }
}