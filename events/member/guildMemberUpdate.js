const { GuildMember } = require("discord.js");
const client = require('../../src/index');

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param {Client} client
     * @param {GuildMember} newMember
     */
    execute(oldMember, newMember) {

        if (newMember.roles.cache.some(role => role.id === client.config.streamnetId)) {
            newMember.roles.remove(client.config.memberId);
        }
    }
}