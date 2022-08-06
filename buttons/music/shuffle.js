const { ButtonInteraction, Client, MessageEmbed } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();


module.exports = {
    id: "shuffleMusic",
    public: true,

    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const player = interaction.client.manager.get(interaction.guildId);

        if (!player.playing) return interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription("❌ There is nothing in the queue.")]},
        setTimeout(() => interaction.deleteReply(), 3000));
            if (!player.queue.length) return interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription("❌ There is nothing in the queue.")]},
            setTimeout(() => interaction.deleteReply(), 3000));

                player.queue.shuffle()

               const shuffleEmbed = new MessageEmbed()
               .setColor("DARK_BUT_NOT_BLACK")
               .setDescription(`🔀 Shuffled the queue`)
                    return interaction.reply({ embeds: [shuffleEmbed]},
                    setTimeout(() => interaction.deleteReply(), 3000));
    }
}