const {
    Client
} = require("discord.js");
const client = require("../../src/index");
const DB = require("../../src/databases/musicDB");


module.exports = {
    name: "trackError",
};

client.manager

    .on("trackError", async (client, player, payload, track, error) => {

        console.error(payload.error);

        const channel = client.channels.cache.get(player.textChannel);
        const thing = new MessageEmbed()
            .setColor("RED")
            .setDescription("<:rejected:995614671128244224> Error when loading song! Track is error");
        channel.send({
            embeds: [thing]
        }).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 3000)
        });
        client.logger.log(`Error when loading song! Track is error in [${player.guild}]`, "error");
        if (!player.voiceChannel) player.destroy();

    })