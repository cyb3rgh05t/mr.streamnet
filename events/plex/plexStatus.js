const { Client, MessageEmbed, WebhookClient } = require("discord.js");
const moment = require("moment");
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
        const date = `${moment().format("hh:mm")}`;
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
                                       name: `StreamNet | Plex Server`
                                   })
                                   .setColor("DARK_BUT_NOT_BLACK")
                                   //.setImage("https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Logo%20PNG%20Positive/LOGO_SNC_FLAT_ns.png?raw=true")
                                   .setThumbnail("https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Avatar/ICON_SNC_white.png?raw=true")
                                   .addFields([{
               
                                       name: "<:icon_reply:993231553083736135> STREAMNET SERVER",
                                       value: `
                                       **\`•\`Name**: StreamNet
                                       **\`•\`Status**: <:icon_online:993231898291736576>  ONLINE
                                       \u200B
                                       \**Enjoy Streaming** 😎
                                       
                                       `
                                   }])
                                   .setTimestamp()
                                   msg.edit({
                                       embeds: [plexstatus]
                                   })
                                   client.logger.log("[PLEX] Plex is online", "ready");
                            }, function (err) {
                                const plexstatus = new MessageEmbed()
                                   .setAuthor({
                                       name: `StreamNet | Plex Server`
                                   })
                                   .setColor("DARK_BUT_NOT_BLACK")
                                   .setThumbnail("https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Avatar/ICON_SNC_white.png?raw=true")
                                   .addFields([{
               
                                       name: "<:icon_reply:993231553083736135> STREAMNET SERVER",
                                       value: `
                                       **\`•\`Name**: StreamNet
                                       **\`•\`Status**: <:icon_offline:993232252647514152>  OFFLINE
                                       \u200B
                                       **Server Updates und Serverwartungen....**
                                       
                                       `
                                   }])
                                   .setTimestamp()
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