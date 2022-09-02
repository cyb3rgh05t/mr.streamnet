<<<<<<< Updated upstream
const { GuildMember, MessageEmbed } = require("discord.js");
const { unsharedChannelId, verifiedId, streamnetId } = require("../../src/config/config.json");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} member
     */
     execute(member) {
      //if (member.roles.cache.some(role => role.id === verifiedId)) {
        const { user, guild } = member
        const leaveChannel = member.guild.channels.cache.get(unsharedChannelId)
	     console.log(`[INFO]`.yellow.bold,`User "${member.user.username}" has left "${member.guild.name}"` );
        const leaveMessage = `**${member.displayName}** has left the server, we now have ${member.guild.memberCount} members!`;
        leaveChannel.send(leaveMessage)
        //}
     }   
=======
const client = require("../../src/index");
const {
  GuildMember,
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   * 
   * @param {Client} client 
   * @param {GuildMember} member
   */
  execute(member) {
    //if (member.roles.cache.some(role => role.id === client.config.verifiedId)) {
    const {
      user,
      guild
    } = member
    const leaveChannel = member.guild.channels.cache.get(client.config.unsharedChannelId)
    client.logger.log(`User "${member.user.username}" has left "${member.guild.name}"`, "log");
    const leaveMessage = `**${member.displayName}** has left the server, we now have ${member.guild.memberCount} members!`;
    leaveChannel.send(leaveMessage)
    //}
  }
>>>>>>> Stashed changes
}