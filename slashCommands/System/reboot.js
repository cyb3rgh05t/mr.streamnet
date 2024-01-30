const { Client, MessageEmbed, CommandInteraction } = require('discord.js')
const client = require("../../src/index");

module.exports = {
    name: "reboot",
    description: "Reboot the bot (DANGEROUS)",
    usage: "/reboot",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        if (interaction.member.id === client.config.ownerId) {
            const restart = new MessageEmbed()
                .setColor("DARK_BUT_NOT_BLACK")
                .setDescription(
                    `Restarting . . . `
                )
            interaction.reply({
                embeds: [restart],
                ephemeral: true,
            }).then(() => {
                process.on('exit', () => {
                    require('child_process').spawn(process.argv.shift(), process.argv, {
                        cwd: process.cwd(),
                        detached: true,
                        stdio: 'inherit'
                    })
                })
                process.exit()
            })
        } else {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `<:rejected:995614671128244224> You cannot use this command.`
                )
            interaction.reply({
                embeds: [embed]
            }, setTimeout(() => interaction.deleteReply(), 3000));
        }
    }
}