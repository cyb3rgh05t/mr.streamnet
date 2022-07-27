const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const warnModel = require("../../src/databases/warnDB");

module.exports = {
    name: "removewarn",
    description: "warn a user",
    usage: "/removewarn [warnid]",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "warnid",
            description: "Provide the ID of the warning.",
            type: "STRING",
            required: true,
        },
    ],

 /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  async execute(interaction) {
      const warnId = interaction.options.getString("warnid")

      if (warnId.length != 24) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
            .setTitle("🚫 Warn ID must be 24 characters.")
            .setColor("RED")
           ]
         });
      }

      const data = await warnModel.findById(warnId);


      const er = new MessageEmbed()
      .setDescription(`No warnID matching ${warnId}`)
      if(!data) return interaction.reply({embeds:[er], ephemeral: true});

      data.delete();
        const embed = new MessageEmbed()
        .setTitle("Remove Infraction")
        .setDescription(`Successfully removed the warn with the ID ${warnId}`)
      const user = interaction.guild.members.cache.get(data.userId)
      return interaction.reply({ embeds: [embed], ephemeral: true})
  }

}