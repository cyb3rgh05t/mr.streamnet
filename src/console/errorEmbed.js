module.exports.error = function (interaction, message, error) {
    const { MessageEmbed } = require("discord.js");
  
    const embed = new MessageEmbed().setColor("DARK_RED").setDescription(`**${error}**`);
    // ternary operator for message
    return message
      ? interaction.editReply({ embeds: [embed] }).then(() => setTimeout(() => message.delete(), 3000))
      : interaction.reply({ embeds: [embed] });
  };
