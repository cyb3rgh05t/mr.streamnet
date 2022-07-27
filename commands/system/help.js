const { Client, SelectMenuInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Lists all Bot commands',
    usage: "/help [command]",
    public: true,
  options: [
    {
      name: "command",
      description: "command to get more info on",
      type: "STRING",
    },
  ],
    /**
     * @param {SelectMenuInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        let cmdFound = "";
        const { options } = interaction;
        const embedDescription = new MessageEmbed();

        const cmdName = options.getString("command");
        if (cmdName) {
            await client.commands.map((cmd) => {
                if (cmd.name == cmdName) {
                    let cmdoptions = cmd.options;
                    cmdFound = cmd.name;
                    embedDescription.setTitle(`Help for \`/${cmd.name}\``);
                    embedDescription.setColor('YELLOW');
                    embedDescription.setDescription(
                        `Description: ${cmd.description || "None"}\n **Usage**: \`${cmd.usage || "None"}\`\n **Permission**: ${cmd.permission || "None"} `);
                if (cmdoptions) {
                    embedDescription.setDescription(
                        `**Description**: ${cmd.description || "None"}\n **Usage**: \`${cmd.usage || "None"}\`\n **Permission**: ${cmd.permission || "None"}\n\n **Command Options**:`
                     );

                    cmdoptions.map((option) => {
                     embedDescription.addField(option.name, `${option.description || "None"}`);
                    });
                }
                
                } else if (!cmdFound) {
                     embedDescription.setColor("RED");
                     embedDescription.setTitle("no command");
                     embedDescription.setDescription(`no commands was found with the name of \`/${cmdName}\`!\n Use \`/help\` to see all the available commands`);
                }
            });
            interaction.reply({ embeds: [embedDescription], ephemeral: true });

        } else {

            const directories = await fs.readdirSync('commands');

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('help-category')
                    .setPlaceholder('Select a category')
                    .addOptions([
                        directories.map(dir => {
                            return {
                                label: dir,
                                value: dir
                            }
                        })
                    ])
                );
                
                const embed = new MessageEmbed()
                .setTitle('Help for all Bot Commands')
                .setDescription('Select a category')
                .setColor('YELLOW')
                //.setTimestamp()

            interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
        }
    }
}