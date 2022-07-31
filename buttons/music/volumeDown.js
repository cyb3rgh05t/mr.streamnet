const { ButtonInteraction, Client, MessageEmbed } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();


module.exports = {
    id: "volumeDownMusic",
    permission: "ADMINISTRATOR",
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const member = interaction.member;

        const player = interaction.client.manager.get({
            guild: interaction.guild.id,
            voiceChannel: member.voice.channel.id,
            textChannel: interaction.channelId,
            selfDeafen: true,
            volume: 100
        });
    
        let amount = Number(player.volume) - 10;
            if (amount = 1) return await interaction.reply("Cannot lower the player volume further more");

            player.setVolume(amount);
            await interaction.reply("🔉 Volume set to \`[ ${player.volume}% ]\`");
    }
}