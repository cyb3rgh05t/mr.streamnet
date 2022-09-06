const { Client, ButtonInteraction, MessageEmbed } = require("discord.js");
const util = require("../../src/functions/util");
const DB = require("../../src/databases/musicDB");

module.exports = {
    id: "resumeMusic",
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

        if (interaction.user.id !== requester && interaction.user.id !== client.config.ownerId) {
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        }

        await player.pause(false);

        const song = player.queue.current;

        const resumeEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription(`▶️ **Wieder aufgenommen**\n\n[${song.title}](${song.uri})`)
        return interaction.reply({
                embeds: [resumeEmbed]
            },
            setTimeout(() => interaction.deleteReply(), 3000));
    }
}