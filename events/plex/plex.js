const { Client, MessageEmbed } = require("discord.js");
const client = require('../../src/index');
const { sys } = require('ping');



module.exports = {
    name: "ready",
    /**
     * @param {Client} client 
     */
    async execute(client) {
        /**
         * Check for plex status
         * 
         */
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
        setInterval(check, 60 * 1000);
        client.logger.log(`[PLEX] Checking Server Status...`, "debug");

        async function check() {
                    sys.probe(client.config.plexURL, (isAlive) => {
                        if(isAlive) {
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
                            client.logger.log(`[PLEX] Plex Server connected and online`, "ready");
                        } else {
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
                            client.logger.log(`[PLEX] Plex Server disconnected`, "error");
                        }
                    })
       }   })
        }
    }
