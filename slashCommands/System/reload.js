const { Client, CommandInteraction } = require("discord.js");
//const { loadEventFiles } = require('../../src/functions/eventLoader');
//const { loadCommandFiles } = require('../../src/functions/cmdLoader');

module.exports = {
        name: "reload",
        description: "Reload Events and Commands",
        usage: "/reload [option]",
        permission: "ADMINISTRATOR",
        options: [{
                name: "events",
                description: "Reload your events",
                type: "SUB_COMMAND",
            },
            {
                name: "commands",
                description: "Reload your commands",
                type: "SUB_COMMAND",
            }
        ],
        /**
         * @param {CommandInteraction} interaction
         * @param {Client} client
         */
        async execute(interaction, client) {
            
            const subCommand = interaction.options.getSubcommand();

            switch(subCommand) {
                case "events" : {
                    for(const [key, value] of client.event)
                    client.removeListener(`${key}`, value, true);
                    loadEventFiles(client);
                    interaction.reply({ content: "Events Reloaded", ephemeral: true});
                }
                break;
                case "commands" : {
                    loadCommandFiles(client);
                    interaction.reply({ content: "Commands Reloaded", ephemeral: true });
                    }
                    break;
            }
        }
}
