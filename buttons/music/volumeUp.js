const {
    ButtonInteraction,
    Client,
    MessageEmbed
} = require("discord.js");

const DB = require("../../src/databases/musicDB");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const {
    Player
} = require("erela.js");
const gClient = new genius.Client();


module.exports = {
    id: "volumeUpMusic",
    public: true,
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const member = interaction.member;

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
        let amount = Number(player.volume) + 10;
        if (amount >= 110) return await interaction.reply({
            embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Kann die Player-Lautstärke nicht weiter erhöhen`)]
        }, setTimeout(() => interaction.deleteReply(), 3000));

        if (dbFound) await dbFound.updateOne({
            volume: player.volume
        });

        await player.setVolume(amount);
        interaction.reply({
            embeds: [new MessageEmbed().setColor("DARK_BUT_NOT_BLACK").setDescription(`🔉 Lautstärke eingestellt auf **${player.volume}%**`)]
        }, setTimeout(() => interaction.deleteReply(), 3000));

    }
}