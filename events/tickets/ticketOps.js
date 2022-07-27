const { ButtonInteraction, MessageEmbed } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const DB = require("../../src/databases/ticketDB");
const TicketSetupData = require("../../src/databases/ticketSetupDB");
const colors = require("colors");

module.exports = {
    
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        const { guild, customId, channel, member } = interaction;
        if (!["close", "lock", "unlock", "claim"].includes(customId)) return;

        const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
        if (!TicketSetup) return interaction.reply({ 
            content: "The data for this system is outdated.",
        });

        if(!member.roles.cache.find((r) => r.id === TicketSetup.Handlers ))
        return interaction.reply({ 
            content: "Nur für Staff Mitglieder!",
        ephemeral: true,
    });

        const Embed = new MessageEmbed().setColor("BLUE");

        DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
            if (err) throw err;
            if (!docs)
                return interaction.reply({
                    content: "Zu diesem Ticket wurden keine Daten gefunden, bitte manuell löschen.",
                    ephemeral: true,
                });
            switch (customId) {
                case "lock":
                    if(docs.Locked == true)
                        return interaction.reply({
                            content: "Das Ticket ist bereits gesperrt",
                            ephemeral: true,
                        });
                    await DB.updateOne({ ChannelID: channel.id}, { Locked: true});
                    Embed.setDescription("🔐 | Dieses Ticket ist jetzt zur Überprüfung gesperrt.")

                    docs.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, {
                            SEND_MESSAGES: false,
                        }); 
                    });

                    interaction.reply({ embeds: [Embed ]});
                    break;
                case "unlock":
                    if(docs.Locked == false)
                        return interaction.reply({
                            content: "Das Ticket ist bereits freigeschaltet",
                            ephemeral: true,
                        });
                    await DB.updateOne({ ChannelID: channel.id}, { Locked: false});
                    Embed.setDescription("🔓 | Dieses Ticket ist jetzt freigeschaltet.")

                    docs.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, {
                            SEND_MESSAGES: true,
                        }); 
                    });
                    interaction.reply({ embeds: [Embed ]});
                    break;
                case "close":
                    if(docs.Closed == true)
                        return interaction.reply({
                            content: "Das Ticket ist bereits geschlossen, bitte warte, bis es gelöscht wird.",
                            ephemeral: true,
                        });
                const attachment = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${docs.Type} - ${docs.TicketID}.html`, 
                });
                await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

                const Message = await guild.channels.cache
                .get(TicketSetup.Transcripts)
                .send({
                    embeds: [
                        Embed.setTitle(`Ticket ID: ${docs.TicketID}`)
                        .setDescription(`Closed By: ${member.user.tag}\nMember: <@${docs.CreatedBy}>`)
                        //.addField(`The Transcript is now saved [TRANSCRIPT](${Message.url})`)
                        .setThumbnail(`${interaction.guild.iconURL({dynamic: true})}`)
                        .setTimestamp(),
                    ],
                    files: [attachment],
                });

                interaction.reply({
                    embeds: [
                        Embed
                        .setDescription(
                            `Das Transcript wurde gespeichert [TRANSCRIPT](${Message.url})`
                        ),
                    ],
                });

                setTimeout(() => {
                    channel.delete();
                }, 10 * 1000);
                break;
                case "claim":
                    if (docs.Claimed == true)
                    return interaction.reply({
                        content: `Dieses Ticket wurde bereits von <@${docs.ClaimedBy}> beansprucht.`,
                        ephemeral: true,
                    });

                    await DB.updateOne(
                        {ChannelID: channel.id}, 
                        {Claimed: true, ClaimedBy: member.id}
                    );

                    Embed.setDescription(`📰 | Dieses Ticket wird jetzt von ${member} beansprucht`);
                    interaction.reply({ embeds: [Embed] });

                    break;
             }
        });
    },
};