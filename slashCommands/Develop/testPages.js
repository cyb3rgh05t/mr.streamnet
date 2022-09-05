const { MessageEmbed, Client } = require('discord.js');
const { embedPages } = require('../../src/handlers/pages');

module.exports = {
    name: "testpages",
    description: "Test the pages handler",
    usage: "/testpages",
    permission: "ADMINISTRATOR",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const embeds = [
            new MessageEmbed()
            .setTitle('Page 1')
            .setDescription('This is page 1')
            .setColor("BLUE"),

            new MessageEmbed()
            .setTitle('Page 2')
            .setDescription('This is page 2')
            .setColor("GREEN"),
        ];

        await embedPages(client, interaction, embeds);
    },
};