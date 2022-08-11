const {
    ButtonInteraction,
    Client,
    MessageEmbed
} = require("discord.js");
const DB = require("../../src/databases/musicDB");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
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
        const volume = dbFound.volume
        let amount = Number(volume) + 10;
        if (amount >= 100) return await interaction.reply({
            embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Cannot higher the player volume further more`)]
        });


        player.setVolume(amount);
        await interaction.reply("🔉 Volume set to **${player.volume}%**");

        if (dbFound) await dbFound.updateOne({
            volume: player.volume
        });
    }
}