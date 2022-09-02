const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const moment = require("moment");
<<<<<<< Updated upstream:commands/premium/premiumList.js
const { ownerId } = require("../../src/config/config.json");

=======
>>>>>>> Stashed changes:slashCommands/Premium/premiumList.js

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
<<<<<<< Updated upstream:commands/premium/premiumList.js
        if (interaction.user.id !== ownerId) // Change to uyour discord user id
        return interaction.reply(`You are not my Owner`);
=======
        if (interaction.user.id !== client.config.ownerId)
            return interaction.reply(`You are not my Owner`);
>>>>>>> Stashed changes:slashCommands/Premium/premiumList.js

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

