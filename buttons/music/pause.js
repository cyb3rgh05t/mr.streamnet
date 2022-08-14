const {
  ButtonInteraction,
  Client,
  MessageEmbed
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();
const DB = require("../../src/databases/musicDB");

module.exports = {
  id: "pauseMusic",
  public: true,
  /**
   * @param {ButtonInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client) {

    const player = interaction.client.manager.get(interaction.guildId);

    const dbFound = await DB.findOne({
      guildId: player.guild
    });

    const requester = dbFound.requesterId

    if (interaction.user.id !== requester) {
      return interaction.reply({
          embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
        },
        setTimeout(() => interaction.deleteReply(), 5000));
    }


    if (!player.queue.current) {
      let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("<:rejected:995614671128244224> Es wird keine Musik gespielt.");
      return interaction.reply({
          embeds: [thing]
        },
        setTimeout(() => interaction.deleteReply(), 3000));
    }

    if (player.paused) {
      let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`⏸️ Der Player ist bereits pausiert.`)
      return interaction.reply({
          embeds: [thing]
        },
        setTimeout(() => interaction.deleteReply(), 3000));
    }

    await player.pause(true)

    const song = player.queue.current;

    let thing = new MessageEmbed()
      .setColor("DARK_BUT_NOT_BLACK")
      .setDescription(`⏸️ **Pausiert**\n\n[${song.title}](${song.uri})`)
    return interaction.reply({
        embeds: [thing]
      },
      setTimeout(() => interaction.deleteReply(), 3000));

  }

}