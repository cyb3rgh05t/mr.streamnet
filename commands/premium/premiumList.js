const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const moment = require("moment");
const { ownerId } = require("../../src/config/config.json");


module.exports = {
    name: "premium-list",
    description: "Shows a list of all premium users",
    usage: "/premium-list",
    permission: "ADMINISTRATOR",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        // Code
        if (interaction.user.id !== ownerId) // Change to uyour discord user id
        return interaction.reply(`You are not my Owner`);

        let data = client.userSettings
            .filter((data) => data.isPremium === true)
            .map((data, index) => {
                return ` <@${data.Id}> Expire At :- \`${moment(
            data.premium.expiresAt
            ).format("dddd, MMMM Do YYYY")}\` Plan :- \`${data.premium.plan}\` `;
        });
    interaction.reply({
        embeds: [
        new MessageEmbed().setDescription(
            data.join("\n") || "No Premium User Found"
        ),
        ],
    });
    }
}

