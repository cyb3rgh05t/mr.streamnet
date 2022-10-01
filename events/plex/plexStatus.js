const { Client, MessageEmbed, WebhookClient } = require("discord.js");
const client = require('../../src/index');
const PlexAPI = require("plex-api");
const plexStatus = new PlexAPI({
    hostname: client.config.plexURL,
    username: client.config.plexUSER,
    password: client.config.plexPASS
});


module.exports = {
    name: "ready",
    /**
     * @param {Client} client 
     */
    async execute(client) {
        //client.logger.log("[PLEX] Connecting to Plex....", "debug");
        plexStatus.query("/").then(function (results) {
            client.logger.log("[PLEX] Connecting to Plex....", "debug");
	        client.logger.log("[PLEX] Connected to Plex!", "log");
            client.logger.log("[PLEX] Plex is online", "ready");
            }, function (err) {
                client.logger.log("[PLEX] Could not connect to Plex!", "error");
                });

                const channelplex = await client.channels.fetch(client.config.plexChannelId)
                const plex = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('<:rejected:995614671128244224> No Data Found!')
                    .setDescription('Please Wait For The Information To Be Collected!')
                channelplex.bulkDelete(10);
                channelplex.send({
                    embeds: [plex]
                }).then((msg) => {
                   check();
                   setInterval(check, 300 * 1000);
                    async function check() {
                        plexStatus.query("/").then(function (results) {
                            const plexstatus = new MessageEmbed()
                                   .setAuthor({
                                       name: `StreamNet | Plex Server`,
                                   })
                                   .setColor("DARK_BUT_NOT_BLACK")
                                   .addFields([{
               
                                       name: "<:icon_reply:993231553083736135> STREAMNET SERVER",
                                       value: `
                                       **\`•\`Name**: StreamNet
                                       **\`•\`Status**: <:icon_online:993231898291736576>  ONLINE
                                       \u200B
                                       **\Enjoy Streaming** <:streamnet:855771751820296232>
                                       
                                       `
                                   }])
                                   msg.edit({
                                       embeds: [plexstatus]
                                   })
                                   client.logger.log("[PLEX] Plex is online", "ready");
                            }, function (err) {
                                const plexstatus = new MessageEmbed()
                                   .setAuthor({
                                       name: `StreamNet | Plex Server`,
                                   })
                                   .setColor("DARK_BUT_NOT_BLACK")
                                   .addFields([{
               
                                       name: "<:icon_reply:993231553083736135> STREAMNET SERVER",
                                       value: `
                                       **\`•\`Name**: StreamNet
                                       **\`•\`Status**: <:icon_offline:993232252647514152>  OFFLINE
                                       \u200B
                                       **Server Updates und Serverwartungen....**
                                       
                                       `
                                   }])
                                   msg.edit({
                                       embeds: [plexstatus]
                                   })
                                   client.logger.log("[PLEX] Could not connect to Plex!", "error");
                                   client.logger.log("[PLEX] Trying reconnecting to Plex....", "debug");
                                });                        
                   } 
                })
    }
}