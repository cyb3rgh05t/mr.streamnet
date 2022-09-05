const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "rules",
    description: "Button to accept the server rules!",
    usage: "/rules",
    permission: "ADMINISTRATOR",
    execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('acceptRole')
                .setLabel('Bestätige die Regeln mit einem Klick')
                .setStyle('SUCCESS'),
            );
        interaction.reply({
            content: `**Bitte akzeptiert die Regeln für die MEMBER Rolle:**\n\n**\`\`\`diff\n- Regel #1:  Streng verboten\`\`\`**\n• Es ist strengstens verboten für StreamNet.Club zu **werben**.\n• Es ist strengstens verboten StreamNet einem nicht vorhandenen Mitglied zu **demonstrieren**.\n• Es ist strengstens verboten über StreamNet.Club  mit einem nicht vorhandenen Mitglied zu **diskutieren**.\n• Du darfst dein StreamNet Konto **nicht** mit anderen Personen **teilen**.\n\n**\`\`\`diff\n- Regel #2:  Sei kein Ars##\`\`\`**\n• Sei allen auf dem Server gegenüber respektvoll.\n\n**\`\`\`diff\n- Regel #3:  Verwende die entsprechenden Kanäle\`\`\`**\n• Bitte verwende den richtigen Kanal für deine Frage und bleib innerhalb des Kanals beim Thema.\n\n**\`\`\`diff\n- Regel #4:  Sei geduldig\`\`\`**\n• Nicht jeder ist jederzeit verfügbar. Jemand wird dir antworten, wenn er kann.\n==============================\n `,
            components: [row]
        })
    }
}