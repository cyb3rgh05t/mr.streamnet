const { Client, MessageEmbed, Message } = require("discord.js");
const { connection, mongoose } = require("mongoose");
const User = require("../../src/databases/userDB");
const DB = require('../../src/databases/clientDB');
const os = require("node:os");
const osUtils = require("os-utils");
const ms = require("ms");
const { uptimer } = require("../../src/functions/uptimer");
const { formatBytes } = require("../../src/functions/formatBytes");
const { switchTo } = require("../../src/functions/switchTo");
const si = require('systeminformation');
const pretty = require('prettysize');
const moment = require("moment");
require("moment-duration-format");
const cpus = os.cpus();
const cpu = cpus[0];

const total = Object.values(cpu.times).reduce(
    (acc, tv) => acc + tv, 0
);

const usage = process.cpuUsage();
const currentCPUUsage = (usage.user + usage.system) * 1000;
const perc = currentCPUUsage / total * 100;

async function getMemoryUsage() {
    return process.memoryUsage().heapUsed / (1024 * 1024).toFixed(2);
}

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     * @param {GuildMember} member     
     * @param {Guild} guild
     */
    async execute(client, member, guild) {

        client.logger.log(`[BOT] Checking Client....`, "debug")
        client.logger.log(`[BOT] Client is starting....`, "debug")
        client.logger.log(`[DISCORD_API] ${client.user.username} is ready with ${client.guilds.cache.size} server!`, "log");
        client.logger.log(`[BOT] Logged in as ${client.user.tag}!`, "ready")
        client.logger.log(`[BOT] Client is now ready and online`, "ready")


        const initialStatus = setTimeout(() => {
            client.user.setPresence({
                activities: [{
                    name: `Initalizing...`,
                    type: "WATCHING"
                }],
                status: "idle"
            });
        });

        const statusArray = [
            `RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed(1)}%`,
            `CPU: ${(perc / 1000 ).toFixed(1)}%`,
            `StreamNet Server`,
        ];
        let index = 0;

        const randTime = Math.floor(Math.random() * 5) + 1;

        setTimeout(() => {

            setInterval(() => {
                if (index === statusArray.length) index = 0;
                const status = statusArray[index];

                client.user.setPresence({
                    activities: [{
                        name: status,
                        type: "WATCHING"
                    }],
                    status: "online"
                });
                index++;
            }, 5 * 1000)

        }, randTime)

        if (!client.config.databaseUrl) return;
        mongoose.connect(client.config.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            client.logger.log(`[DATABASE] Connected to MongoDB Database!`, "log")
            client.logger.log(`[DATABASE] Database is now online`, "ready")
        }).catch((err) => {
            client.logger.log(err, "error")
        });
        mongoose.connection.on('disconnected', () => {
            client.logger.log('[DATABASE] Mongoose disconnected!', "warn");
        });

        const users = await User.find();
        for (let user of users) {
            client.userSettings.set(user.Id, user);
        }
        require('../../src/handlers/premium')(client)

        const channelLava = await client.channels.fetch(client.config.lavalinkChannelId)
        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('<:rejected:995614671128244224> No Data Found!')
            .setDescription('Please Wait For The Information To Be Collected!')
        channelLava.bulkDelete(10);
        channelLava.send({
            embeds: [embed]
        }).then((msg) => {
            check();
            setInterval(check, 120 * 1000);
             async function check() {

                const rembed = new MessageEmbed()
                    .setAuthor({
                        name: `StreamNet | Music Server`
                    })
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setThumbnail("https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Avatar/ICON_SNC_white.png?raw=true")
                    .addFields([{

                        name: "<:icon_reply:993231553083736135> LAVALINK-SERVER",
                        value: `
                        ${client.manager.nodes.map((node) => `
                        **\`•\`Name**: ${node.options.identifier}
                        **\`•\`Status**: ${node.connected ? "<:icon_online:993231898291736576>  ONLINE" : "<:icon_offline:993232252647514152> OFFLINE"}
                        **\`•\`Memory Usage**: ${formatBytes(node.stats.memory.allocated)} - ${node.stats.cpu.lavalinkLoad.toFixed(2)}%
                        **\`•\`Connections**: ${node.stats.playingPlayers} / ${node.stats.players} players
                        
                        `)}`
                    }])
                    .setTimestamp()
                msg.edit({
                    embeds: [rembed]
                 })  
                
            }
        })


        client.manager.init(client.user.id);

        const channelSys = await client.channels.fetch(client.config.systemChannelId)
        let cl1 = await si.currentLoad();
        const Sysembed = new MessageEmbed()
            .setColor('RED')
            .setTitle('<:rejected:995614671128244224> No Data Found!')
            .setDescription('Please Wait For The Information To Be Collected!')
        channelSys.bulkDelete(10);
        channelSys.send({
            embeds: [Sysembed]
        }).then((msg) => {
            check();
            setInterval(check, 120 * 1000);
             async function check() {

                let netdata = await si.networkStats();
                let memdata = await si.mem();
                let diskdata = await si.fsSize();
                let osdata = await si.osInfo();
                let cpudata = await si.cpu();
                //let uptime = await os.uptime();

                const Sysrembed = new MessageEmbed()
                    .setAuthor({
                        name: `StreamNet Server | Information`
                    })
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setThumbnail("https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Avatar/ICON_SNC_white.png?raw=true")
                    //.setImage("https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/vmod.png?raw=true")
                    .addFields({

                        name: `<:icon_reply:993231553083736135> SYSTEM`,
                        value: `
                        **\`•\` Cpu**: ${cpudata.manufacturer + " " + cpudata.brand}
                        **\`•\` Load**: ${cl1.currentLoad.toFixed(2)}%
                        **\`•\` Cores**: ${cpudata.cores}
                        **\`•\` Platform**: ${osdata.platform}
                        **\`•\` Memory Available**: ${pretty(memdata.total)}
                        **\`•\` Memory Used**: ${pretty(memdata.active)}
                        **\`•\` Database**: ${switchTo(connection.readyState)}
                        ㅤ
                        `,
                        inline: false

                    }, {

                        name: `<:icon_reply:993231553083736135> HARDDRIVE`,
                        value: `
                        **\`•\` Used**: ${pretty(diskdata[0].used)} / ${pretty(diskdata[0].size)}
                        ㅤ
                        `,
                        inline: true

                    }, {

                        name: `<:icon_reply:993231553083736135> NETWORK`,
                        value: `
                        **\`•\` Ping**: ${Math.round(netdata[0].ms)}ms
                        **\`•\` Up**: ${pretty(netdata[0].tx_sec)}/s
                        **\`•\` Down**: ${pretty(netdata[0].rx_sec)}/s

                        **\`•\` Total Up**: ${pretty(netdata[0].tx_bytes)}
                        **\`•\` Total Down**: ${pretty(netdata[0].rx_bytes)}
                        `,
                        inline: false,

                    })
                    .setTimestamp()
                msg.edit({
                    embeds: [Sysrembed]
                })  
                
            }
        })

        let memArray = [];

        setInterval(async () => {

            memArray.push(await getMemoryUsage());

            if (memArray.length >= 14) {
                memArray.shift();
            }

            await DB.findOneAndUpdate({
                Client: true,
            }, {
                Memory: memArray,
            }, {
                upsert: true,
            });

        }, ms("5s"));

    },
}