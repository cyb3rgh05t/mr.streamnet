const { CommandInteraction, MessageEmbed } = require("discord.js");
const { ownerId } = require("../../src/config/config.json");
const User = require("../../src/databases/userDB");

module.exports = {
    name: "remove-premium",
    description: "Removes premium from a user",
    usage: "/remove-premium [user]",
    permission: "ADMINISTRATOR",
    options: [
        {
          name: "user",
          description: `mention a premium user`,
          type: "USER",
          required: true,
        },
      ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        // Code
        if (interaction.user.id !== ownerId) // Change to uyour discord user id
        return interaction.reply(`You are not my Owner`);

        
        let user = interaction.options.getUser("user");
        let data = client.userSettings.get(user.id);
        if (!data.isPremium) {
        return interaction.reply(`${user} is Not a Premium User`);
        } else {
        await User.findOneAndRemove({ Id: user.id });
        await client.userSettings.delete(user.id);
        interaction.reply(`${user} Removed From Premium`);
        }
  },
}