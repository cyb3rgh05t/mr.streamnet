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
    id: "queueClose",
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

        const fetchedMessage = await client.channels.cache.get(player.textChannel).messages.fetch(dbFound.queueId)

        await fetchedMessage.delete()

    }
}