const { CommandInteraction, MessageEmbed } = require("discord.js");
const colors = require("colors");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} Client
     */

    async execute(interaction, client) {
        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("✖ An error occured while running this command")
            ], ephemeral: true}) && client.commands.delete(interaction.commandName);

            if (command.permission && !interaction.member.permissions.has(command.permission)) {
              return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, ephemeral: true })
            }

            const User = require("../../src/databases/userDB");

            if (command) {
              let user = client.userSettings.get(interaction.user.id);

              // If there is no user, create it in the Database as "newUser"
              if (!user) {
                const findUser = await User.findOne({ Id: interaction.user.id });
                if (!findUser) {
                  const newUser = await User.create({ Id: interaction.user.id });
                  client.userSettings.set(interaction.user.id, newUser);
                  user = newUser;
                } else return;
              }
                          
              if (command.premium && user && !user.isPremium) {
                return interaction.reply(`You are not premium user`);
              } else {
                return await command.execute( interaction, client );
              }

            }                                  
            //command.execute(interaction, client);
            //console.log(`[INFO]`.yellow.bold,`${interaction.user.tag} in channel #${interaction.channel.name} triggered an interaction "/${interaction.commandName}".`)
        }
    }
}


