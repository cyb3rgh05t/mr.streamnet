const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "nowplaying",
    description: "Now playing",
    usage: "/nowplaying",
    public: true,
    
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
     async execute(interaction, client) {

        const player = client.manager.get(interaction.guildId);

        const track = player.queue.current;

        const npEmbed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setTitle("🎶 Now Playing")
        .setDescription(`[${track.title}](${track.uri}) [${player.queue.current.requester}]`)
        .setThumbnail(track.displayThumbnail("3"))

        return interaction.reply({ embeds: [npEmbed] }) 
    }
}