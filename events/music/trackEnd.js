const {
    Client
} = require("discord.js");
const client = require("../../index");
const DB = require("../../src/databases/musicDB");


module.exports = {
    name: "trackEnd",
};

client.manager

    .on("trackEnd", async (player, track) => {

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const fetchedMessage = await client.channels.cache.get(player.textChannel).messages.fetch(dbFound.messageId)

        await fetchedMessage.delete()

        //player.destroy()

    })