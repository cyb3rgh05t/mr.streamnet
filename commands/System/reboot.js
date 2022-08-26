const {
    ownerId
} = require('../../src/config/config.json');
const {
    MessageEmbed,
    ChatInputCommandInteraction,
    CommandInteraction,
} = require('discord.js')

module.exports = {
    name: "reboot",
    description: "Reboot the bot (DANGEROUS)",
    permissions: "ADMINISTRATOR",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        if (interaction.member.id === ownerId) {
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
                embeds: [embed],
                ephemeral: true
            })
        }
    }
}