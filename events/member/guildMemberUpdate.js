const client = require("../../src/index");
<<<<<<< Updated upstream
const { GuildMember } = require("discord.js");
const { memberId, streamnetId } = require("../../src/config/config.json");
=======
const {
    GuildMember
} = require("discord.js");
>>>>>>> Stashed changes

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param {Client} client
     * @param {GuildMember} newMember
     */
    execute(oldMember, newMember) {

<<<<<<< Updated upstream
    if (newMember.roles.cache.some(role => role.id === streamnetId)) {
        newMember.roles.remove(memberId);
=======
        if (newMember.roles.cache.some(role => role.id === client.config.streamnetId)) {
            newMember.roles.remove(client.config.memberId);
>>>>>>> Stashed changes
        }
    }
}