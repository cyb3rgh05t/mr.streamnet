const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "usercontext",
    type: "USER",
    usage: "context menu",
    permission: "SEND_MESSAGES",
    /**
     * 
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction) {
      const target = await interaction.guild.members.fetch(interaction.targetId);

      const Response = new MessageEmbed()
      .setColor("BLUE")
      //.setAuthor(target.user.tag, target.user.avatarURL({dynamic: true, size: 512}))
      .setAuthor({ name: target.user.tag, iconURL: target.user.avatarURL({dynamic: true, size: 512})})
      .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
      .addField("ID", `${target.user.id}`)
      .addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "NONE"}`)
      .addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
      .addField("Discord User Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

      interaction.reply({embeds: [Response], ephemeral: true})
    }
}