const { GuildMember, MessageEmbed } = require("discord.js");
const client = require('../../src/index');

module.exports = {
  name: "guildMemberRemove",
  /**
   * 
   * @param {Client} client 
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member
    const leaveChannel = member.guild.channels.cache.get(client.config.unsharedChannelId)
    client.logger.log(`User "${member.user.username}" has left "${member.guild.name}"`, "log");
    const leaveMessage = `**${member.displayName}** has left the server, we now have ${member.guild.memberCount} members!`;
    leaveChannel.send(leaveMessage)
  }
}