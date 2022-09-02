const client = require("../../src/index");
<<<<<<< Updated upstream
const { GuildMember, MessageEmbed } = require("discord.js");
const { Captcha } = require("discord.js-captcha");
const { verifiedId, verifiedChannelId, guildId, newMemberChannelId } = require("../../src/config/config.json");

=======
const {
    GuildMember,
    MessageEmbed
} = require("discord.js");
const {
    Captcha
} = require("discord.js-captcha");
>>>>>>> Stashed changes

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} member
     */
    execute(member) {
        const captcha = new Captcha(client, {
            guildID: client.config.guildId,
            roleID: client.config.verifiedId,
            channelID: client.config.verifiedChannelId,
            sendToTextChannel: false,
            addRoleOnSuccess: true,
            kickOnFailure: true,
            caseSensitive: true,
            attempts: 3,
            timeout: 60000,
            showAttemptCount: true,
            customPromptEmbed: new MessageEmbed()
            .setAuthor({ name: `${member.guild.name}`, iconURL: member.guild.iconURL({ dynamic: true }), url: 'https://discord.gg/gUmHCurE4g' })
            .setTitle(`Willkomen bei ${member.guild.name}!`)
            .setDescription(`**${member.user}**,\n um Zugriff auf **${member.guild.name}** zu erhalten, löse bitte das CAPTCHA unten!`)
            .addFields(
                { name: 'Was passiert wenn ich das Captcha nicht ausfülle?', value: 'Du wirst gekickt, um es erneut zu versuchen.' },
            )
            .setColor("RANDOM")
            .setThumbnail(member.guild.iconURL({ dynamic: true })),
            customSuccessEmbed: new MessageEmbed()
            .setAuthor({ name: `${member.guild.name}`, iconURL: member.guild.iconURL({ dynamic: true }), url: 'https://discord.gg/gUmHCurE4g' })
            .setTitle("<:approved:995615632961847406> CAPTCHA Solved!")
            .setDescription(`${member.user}, du hast das CAPTCHA erfolgreich ausgefüllt und dir wurde Zugriff auf **${member.guild.name}** gewährt!`)
            .addField("Bestätige die Regeln", "<#694495838013095967>")
            .setTimestamp()
            .setColor("GREEN")
            .setThumbnail(member.guild.iconURL({ dynamic: true })),
            customFailureEmbed: new MessageEmbed()
            .setAuthor({ name: `${member.guild.name}`, iconURL: member.guild.iconURL({ dynamic: true }), url: 'https://discord.gg/gUmHCurE4g' })
            .setTitle("<:rejected:995614671128244224> CAPTCHA Failed!")
            .setDescription(`${member.user}, du hast das CAPTCHA nicht erfolgreich ausgefüllt!`)
            .addField("Du wurdest vom Server gekickt", "Um es erneut zu versuchen, klicke auf -> **[StreamNet Invite](https://discord.gg/gUmHCurE4g)**")
            .setTimestamp()
            .setColor("RED")
            .setThumbnail(member.guild.iconURL({ dynamic: true })),
        });

        captcha.present(member);

        if (captcha.on("success", data => {
<<<<<<< Updated upstream
            const { user, guild } = member   
            const newMemberChannel = member.guild.channels.cache.get(newMemberChannelId)
            console.log(`A Member has Solved a CAPTCHA!`);
            console.log(data);
	        console.log(`[INFO]`.yellow.bold,`New User "${member.user.username}" has joined "${member.guild.name}"` );
            const newMemberMessage = `**${member.user}** joined the Server, we now have ${member.guild.memberCount} members!`;
            newMemberChannel.send(newMemberMessage)
        }));
=======
                const {
                    user,
                    guild
                } = member
                const newMemberChannel = member.guild.channels.cache.get(client.config.newMemberChannelId)
                client.logger.log(`A Member has Solved a CAPTCHA!`, "log");
                client.logger.log(data, "log");
                client.logger.log(`New User "${member.user.username}" has joined "${member.guild.name}"`, "log");
                //const newMemberMessage = `**${member.user}** joined the Server, we now have ${member.guild.memberCount} members!`;
                newMemberChannel.send({
                    embeds: [new MessageEmbed().setColor("DARK_BUT_NOT_BLACK").setDescription(`**${member}** joined the Server, we now have ${member.guild.memberCount} members!`)]
                })
            }));
>>>>>>> Stashed changes

        /*if (captcha.on("failure" || "timeout", data => {
            const { user, guild } = member
            member.kick();
            //console.log(`A Member has Solved a CAPTCHA!`);
            console.log(data);
        }));*/
    }
}