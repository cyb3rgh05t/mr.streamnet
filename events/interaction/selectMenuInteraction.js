<<<<<<< Updated upstream
const { SelectMenuInteraction, MessageEmbed } = require("discord.js");
=======
const {
    SelectMenuInteraction,
    MessageEmbed
} = require("discord.js");
const {
    Permissions
} = require("../../src/validation/permissions");
>>>>>>> Stashed changes
const fs = require('fs');

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {SelectMenuInteraction} interaction
     * @param {Client} Client
     */

    async execute(interaction, client) {
        if (interaction.isSelectMenu()) {
            if (interaction.customId === 'help-category') {
                const category = interaction.values;
                
                const embed = new MessageEmbed()
                    .setTitle(`${category} commands`)
                    .setDescription(`${fs.readdirSync(`slashCommands/${category}`).map(file => {
                        return `\`${file.split('.')[0]}\``
                    }).join(', ')}`)
                    .setFields([{name: 'Command description:', value: 'use \`/help [command_name]\`'}])
                    .setColor('YELLOW')
                    //.setTimestamp();
                    interaction.update({ embeds: [embed], ephemeral: true })
            
        }
        }
    }
}    