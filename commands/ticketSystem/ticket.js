const { CommandInteraction, MessageEmbed } = require(`discord.js`);
const DB = require("../../src/databases/ticketDB");

module.exports = {
    name: "ticket",
    description: "Ticket actions",
    usage: "/ticket [action] [member]",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "action",
            type: "STRING",
            description: "Add or remove a member from the ticket",
            required: true,
            choices: [
                { name: "Add", value: "add"},
                { name: "Remove", value: "remove"},
            ],
        },
        {
            name: "member",
            description: "Select a member",
            type: "USER",
            required: true,
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guildId, options, channel, guild, member } = interaction;

        const Action = options.getString("action");
        const Member = options.getMember("member");

        const Embed = new MessageEmbed();

        switch (Action) {
            case "add": 
                DB.findOne({GuildID: guildId, ChannelID: channel.id}, async (err, docs) => {
                    if (err) throw err;
                    if (!docs) {
                        Embed
                            .setColor("RED")
                            .setDescription(`<:rejected:995614671128244224> This channel is not tied with a ticket.`);
                        return interaction.reply({embeds: [Embed], ephemeral: true});
                    }
                    
                    if (docs.MembersID.includes(Member.id)) {
                        Embed
                            .setColor("RED")
                            .setDescription(`<:rejected:995614671128244224> This member is already added to this ticket.`);
                        return interaction.reply({embeds: [Embed]});
                    }

                    docs.MembersID.push(Member.id);

                    channel.permissionOverwrites.edit(Member.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true,
                    });

                    interaction.reply({
                        embeds: [
                            Embed.setColor("GREEN").setDescription(
                                `<:approved:995615632961847406> ${Member} has been added to the ticket`
                            ),
                        ],
                    });
                    docs.save();
                }
            );
            break;
            case "remove": 
                DB.findOne({GuildID: guildId, ChannelID: channel.id}, async (err, docs) => {
                    if (err) throw err;
                    if (!docs) {
                        Embed
                            .setColor("RED")
                            .setDescription(`<:rejected:995614671128244224> This channel is not a ticket channel`);
                        return interaction.reply({embeds: [Embed], ephemeral: true});
                    }
                    if (!docs.MembersID.includes(Member.id)) {
                        Embed
                            .setColor("RED")
                            .setDescription(`<:rejected:995614671128244224> This member is not in the ticket`);
                        return interaction.reply({embeds: [Embed], ephemeral: true});
                    }
        
                    docs.MembersID.remove(Member.id);
        
                    channel.permissionOverwrites.edit(Member.id, {
                    VIEW_CHANNEL: false,
                    });
        
                    interaction.reply({
                        embeds: [
                            Embed.setColor("GREEN").setDescription(
                             `<:approved:995615632961847406> ${Member} has been removed from this ticket`
                            ),
                        ],
                    });
                    docs.save();
                }
                );
                break;
            }
    }
        
};