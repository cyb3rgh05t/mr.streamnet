const {
    MessageActionRow,
    MessageButton,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "join",
    description: "Button to join a voice channel!",
    usage: "/join",
    permission: "ADMINISTRATOR",
    execute(interaction) {

        const {
            options,
            member,
            guild
        } = interaction;

        const embed = new MessageEmbed()
            .setAuthor({
                name: `${guild.name} | Music System`,
                iconURL: `${guild.iconURL({dynamic: true})}`
            })
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle('🎶 Lust auf Musik ? 🎶')
            .setDescription("Befolge diese einfachen Schritte...\n\n1️⃣ Joine den Musik Voice Kanal!\n2️⃣ Klicke auf den **Play Music** Button! ")
            .setThumbnail(guild.iconURL({
                dynamic: true
            }))

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle('LINK')
                .setLabel('Join Musik Kanal')
                .setEmoji('🔉')
                .setURL('https://discord.gg/UUGSrfwYFC')
                .setDisabled(false),
                new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('Play Music')
                .setEmoji('▶️')
                .setCustomId('playMusic')
                .setDisabled(false)
            );

        interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
}