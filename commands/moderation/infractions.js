const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const warnModel = require("../../src/databases/warnDB");


module.exports = {
    name: "infractions",
    description: "display the warnings a user has",
    usage: "/infractions [target]",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "target",
            description: "Provide a user to view their warnings", // Change able
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
     async execute(interaction) {
        const user = interaction.options.getUser("target");

        const userWarnings = await warnModel.find({ userId: user.id, guildId: interaction.guild.id});


        const er = new MessageEmbed()
        .setTitle("User Infractions")
        .setDescription(`${user} has no infractions`)

        if(!userWarnings?.length) return interaction.reply({ embeds: [er], ephemeral: true});


        const embedDescription = userWarnings.map((warn) =>{
            const moderator = interaction.guild.members.cache.get(
                warn.moderatorId
            );

            return [
                `**Warn ID**: ${warn.id}`,
                `**Moderator**: ${moderator || "Has left"}`,
                `**Reason**: ${warn.reason}`,
        ].join("\n");
        }) .join("\n\n");

        const embed = new MessageEmbed()
        .setTitle(`${user.tag}'s infractions`)
        .setDescription(embedDescription)
        .setColor("AQUA")

        interaction.reply({ embeds: [embed], ephemeral: true});
    }
}