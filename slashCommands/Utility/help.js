const { Client, SelectMenuInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const GuildSettings = require('../../src/databases/settingsDB');

module.exports = {
    name: 'help',
    description: 'Lists all Bot commands',
    usage: "/help [command]",
    public: true,
    options: [{
        name: "command",
        description: "command to get more info on",
        type: "STRING",
    }, ],
    /**
     * @param {SelectMenuInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        let storedSettings = await GuildSettings.findOne({
            GuildID: client.config.guildId,
          });
          if (!storedSettings) {
            const newSettings = new GuildSettings({
              GuildID: client.config.guildId,
            });
            await newSettings.save().catch((e) => {
              console.log(e);
            });
            storedSettings = await GuildSettings.findOne({
              GuildID: client.config.guildId
            });
          }
      
          const prefix = storedSettings.Prefix;

        let cmdFound = "";
        const {
            options
        } = interaction;
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
                        `**Description**: ${cmd.description || "None"}\n\n**Usage**: \`${cmd.usage || "None"}\`\n\n**Permission**: ${cmd.permission || "None"} `);
                    if (cmdoptions) {
                        embedDescription.setDescription(
                            `**Description**: ${cmd.description || "None"}\n\n**Usage**: \`${cmd.usage || "None"}\`\n\n**Permission**: ${cmd.permission || "None"}\n\n**Command Options**:`
                        );

                        cmdoptions.map((option) => {
                            embedDescription.addFields({ name: option.name, value: `${option.description || "None"}`});
                        });
                    }

                } else if (!cmdFound) {
                    embedDescription.setColor("RED");
                    embedDescription.setTitle("no command");
                    embedDescription.setDescription(`no commands was found with the name of \`/${cmdName}\`!\n Use \`/help\` to see all the available commands`);
                }
            });
            interaction.reply({
                embeds: [embedDescription],
                ephemeral: true
            });

        } else {

            const directories = await fs.readdirSync('slashCommands');

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('help-category')
                    .setPlaceholder('Wähle eine Kategorie')
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
                .setTitle(`${client.user.username} | Help`)
                .setDescription(` Hallo **<@${interaction.member.user.id}>**, Ich bin <@${client.user.id}>. \n\nEin mehrzweck Butler Bot für StreamNet.club.\n\n Prefix: \`${prefix}\`\n\n*Wähle unten eine Kategorie aus, für alle Befehle.* \n\n`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor("DARK_BUT_NOT_BLACK")
            //.setTimestamp()

            interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        }
    }
}