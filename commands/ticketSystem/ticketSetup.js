const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const colors = require("colors");
const DB = require("../../src/databases/ticketSetupDB");

module.exports = {
    name: "ticketsetup",
    description: "Setup your ticket panel",
    usage: "/ticketsetup [channel] [category] [transcript] [helpers] [description] [buttons]",
    permission: "ADMINISTRATOR",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "channel", 
            description: "Select a ticket creation channel", 
            required: true, 
            type: "CHANNEL", 
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "category", 
            description: "Select the ticket channels parent category", 
            required: true, 
            type: "CHANNEL", 
            channelTypes: ["GUILD_CATEGORY"]
        },
        {
            name: "transcripts", 
            description: "Select a ticket transcripts channel", 
            required: true, 
            type: "CHANNEL", 
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "helpers", 
            description: "Select the ticket helpers role",
            required: true, 
            type: "ROLE",
        },
        {
            name: "everyone", 
            description: "Provide the @everyone role.",
            required: true, 
            type: "ROLE",
        },
        {
            name: "description", 
            description: "Set a description of the ticket system",
            required: true, 
            type: "STRING",
        },
        {
            name: "firstbutton", 
            description: "Select a name for your first button", 
            required: true, 
            type: "STRING", 
        },
        {
            name: "secondbutton", 
            description: "Select a name for your second button",
            required: true,
            type: "STRING", 
        },
        {
            name: "thirdbutton", 
            description: "Select a name for your third button",
            required: true, 
            type: "STRING", 
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options } = interaction;

        try {
            const Channel = options.getChannel("channel");
            const Category = options.getChannel("category");
            const Transcripts = options.getChannel("transcripts");

            const Handlers = options.getRole("helpers");
            const Everyone = options.getRole("everyone");
            const Description = options.getString("description");

            const Button1 = options.getString("firstbutton").split(",");
            const Button2 = options.getString("secondbutton").split(",");
            const Button3 = options.getString("thirdbutton").split(",");

            const Emoji1 = "<:help:997600514957119518>";
            const Emoji2 = "<:invite:997600585098473502>";
            const Emoji3 = "<:movie:997600641956454522>";

            await DB.findOneAndUpdate(
                {GuildID: guild.id},
                {
                    Channel: Channel.id,
                    Category: Category.id,
                    Transcripts: Transcripts.id,
                    Handlers: Handlers.id,
                    Everyone: Everyone.id,
                    Description: Description,
                    Buttons: [Button1[0], Button2[0], Button3[0]],
                },
                {
                    new: true,
                    upsert: true,
                }
            );

            const Buttons = new MessageActionRow();
                Buttons.addComponents(
                    new MessageButton()
                     .setCustomId(Button1[0])
                     .setLabel(Button1[0])
                     .setStyle("DANGER")
                     .setEmoji(Emoji1),
                    new MessageButton()
                     .setCustomId(Button2[0])
                     .setLabel(Button2[0])
                     .setStyle("SECONDARY")
                     .setEmoji(Emoji2),
                    new MessageButton()
                     .setCustomId(Button3[0])
                     .setLabel(Button3[0])
                     .setStyle("SUCCESS")
                     .setEmoji(Emoji3),
            );

            const Embed = new MessageEmbed()
            .setAuthor({
                name: `${guild.name} | Ticket System`, 
                iconURL: `${guild.iconURL({dynamic: true})}`
            })
            .setTitle("StreamNet Support")
            .setDescription(Description)
            .setColor("RANDOM")
            .setThumbnail(guild.iconURL({dynamic: true}));

            await guild.channels.cache
                .get(Channel.id)
                .send({ embeds: [Embed], components: [Buttons] });
            
            interaction.reply({ content: "Done", ephemeral: true });

        } catch (err) {
            const errEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `❌ | An error ocurred while up your ticket system\n**What should I make sure of?**
                    1. Make sure none of your buttons' names are duplicated.
                    2. Make sure your button names do not exceed 200 characters
                    `
                );
            console.error(`[ERROR]`.red.bold, err);
            interaction.reply({embeds: [errEmbed]});
        }
    },
};