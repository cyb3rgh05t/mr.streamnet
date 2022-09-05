const { Client, GuildMember, MessageEmbed } = require("discord.js");
const client = require('../../src/index');
const {
    drawCard,
    Text
} = require('discord-welcome-card');
const {
    registerFont
} = require('canvas');
const {
    join
} = require('path');
registerFont(join(__dirname, '../../src/fonts/Panton-BlackCaps.ttf'), {
    family: 'Panton'
});
const {
    memberId,
    streamnetId,
    welcomeChannelId
} = require("../../src/config/config.json");



module.exports = {
    id: "acceptRole",
    async execute(interaction) {
        const member = interaction.member;

        if (member.roles.cache.has(memberId) || member.roles.cache.has(streamnetId)) {
            await interaction.reply({
                content: 'Du hast die Regeln schon bestätigt!!',
                ephemeral: true
            });
        } else {
            const {
                guild
            } = interaction.message
            const member = interaction.member;
            member.roles.add(memberId);
            await interaction.reply({
                content: 'Regeln bestätigt und Rolle wurde hinzugefügt!',
                ephemeral: true
            });
            const image = await drawCard({
                theme: "dark",
                blur: false,
                rounded: true,
                text: {
                    title: new Text('Willkommen', 250, 100)
                        .setFontSize(35)
                        .setStyle(`#03B0CC`),
                    text: new Text(member.user.username, 250, 170)
                        .setFontSize(55),
                    color: `#DDDDDD`,
                    font: 'Panton',
                },
                avatar: {
                    image: member.user.avatarURL({
                        dynamic: true,
                        format: 'png',
                        size: 2048,
                    }),
                    borderRadius: 1, // Corner radius of the avatar (0.5 = 50% rounded)
                    imageRadius: 0.75, // Size of the avatar (0.85 = 85%)
                    outlineWidth: 10,
                    outlineColor: "#00B1CD",
                },
                card: {
                    /** Override the Background, can be a URL/Canvas/Image or Buffer  */
                    background: '',

                },
            });
            const embed = new MessageEmbed()
                .setColor("DARK_BUT_NOT_BLACK")
                .setAuthor({
                    name: member.user.username,
                    iconURL: member.user.displayAvatarURL({
                        dynamic: true,
                        format: 'png',
                    })
                })
                .setTitle(`Willkommen in der Community 😀`)
                .setDescription(`${member}, Schau dir den <#825364230827409479> Channel an und befolge die Schritte wenn du Zutritt zum Server willst!`)
                .setThumbnail(member.user.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                }))
            member.send({
                embeds: [embed]
            });
            const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
            //const welcomeMessage = `Hey ${member}, willkommen in der Community 😀\nSchau dir den <#825364230827409479> Channel an und befolge die Schritte wenn du Zutritt zum Server willst!`;
            const welcomeMessage = `Begrüssen wir ${member} in der Community 😎\nHerzlich Willkommen und viel Spass. `
            welcomeChannel.send(welcomeMessage);
            client.logger.log(`Welcome message for "${member.user.username}" was send to the #general channel!`, "log");

        }
    }
}