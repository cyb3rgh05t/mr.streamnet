module.exports = {
    id: "bye",
    permission: "ADMINISTRATOR",
    execute(interaction) {
        interaction.reply({content: "YES! ITS WORKING. BYE!"})
    }
}