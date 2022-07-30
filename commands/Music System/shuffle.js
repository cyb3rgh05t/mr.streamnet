const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "shuffle",
    description: "Shuffle song",
    usage: "/shuffle",
    public: true,
    
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        if (!player.playing) return interaction.reply({ content: "There is nothing in the queue." });
            if (!player.queue.length) return interaction.reply({ content: "There is nothing in the queue." });

                player.queue.shuffle()

                const shuffleEmbed = new MessageEmbed()
                .setColor("DARK_BUT_NOT_BLACK")
                .setDescription("🔀 Shuffled the queue.")
                return interaction.reply({ embeds: [shuffleEmbed] })

    }
}