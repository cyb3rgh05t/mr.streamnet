const {
  CommandInteraction,
  MessageEmbed,
  Client
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
  name: "pause",
  description: "Pause song",
  usage: "/pause",
  public: true,

  /**
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client) {
    await interaction.deferReply({
      ephemeral: false
    });

    const player = interaction.client.manager.get(interaction.guildId);

    if (!player.queue.current) {
      let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("There is no music playing.");
      return interaction.editReply({
        embeds: [thing]
      });
    }

    if (player.paused) {
      let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`⏸️ The player is already paused.`)
      return interaction.editReply({
        embeds: [thing]
      });
    }

    await player.pause(true);

    const song = player.queue.current;

    let thing = new MessageEmbed()
      .setColor("DARK_BUT_NOT_BLACK")

      .setDescription(`⏸️ **Paused**\n\n[${song.title}](${song.uri})`)
    return interaction.editReply({
      embeds: [thing]
    });


  }
}