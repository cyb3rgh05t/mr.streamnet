const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "usercontext",
  type: "USER",
  usage: "context menu",
  public: true,
  /**
   * 
   * @param {ContextMenuInteraction} interaction
   */
  async execute(interaction) {
    const target = await interaction.guild.members.fetch(interaction.targetId);

    const Response = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor({
        name: target.user.tag,
        iconURL: target.user.avatarURL({
          dynamic: true,
          size: 512
        })
      })
      .setThumbnail(target.user.avatarURL({
        dynamic: true,
        size: 512
      }))
      .addFields({ name: "ID", value: `${target.user.id}`})
      .addFields({ name: "Roles", value: `${target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "NONE"}`})
      .addFields({ name: "Member Since", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true})
      .addFields({ name: "Discord User Since", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true})

    interaction.reply({
      embeds: [Response],
      ephemeral: true
    })
  }
}