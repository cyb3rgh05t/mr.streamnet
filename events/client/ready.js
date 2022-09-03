const {
    Client,
    MessageEmbed,
    Message
} = require("discord.js");
const {
    connection,
    mongoose
} = require("mongoose");
const User = require("../../src/databases/userDB");
const DB = require('../../src/databases/clientDB');
const os = require("node:os");
const osUtils = require("os-utils");
const ms = require("ms");
const si = require('systeminformation');
const pretty = require('prettysize');
const moment = require("moment");
require("moment-duration-format");

/* ----------[CPU Usage]---------- */
const cpus = os.cpus();
const cpu = cpus[0];

// Accumulate every CPU times values
const total = Object.values(cpu.times).reduce(
    (acc, tv) => acc + tv, 0
);

// Calculate the CPU usage
const usage = process.cpuUsage();
const currentCPUUsage = (usage.user + usage.system) * 1000;
const perc = currentCPUUsage / total * 100;

/* ----------[RAM Usage]---------- */

/**Get the process memory usage (in MB) */
async function getMemoryUsage() {
    return process.memoryUsage().heapUsed / (1024 * 1024).toFixed(2);
}

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    async execute(client) {
        //Bot Activity
        client.logger.log(`[BOT] Checking Client....`, "debug")
        client.logger.log(`[BOT] Logged in as ${client.user.tag}`, "ready")
        client.logger.log(`[BOT] Client is starting....`, "debug")
        client.logger.log(`[BOT] Client is now ready and online!`, "ready")

        // Client Activity
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
            }, 5 * 1000) // Time in ms

        }, randTime)

        // Initializing Database Connection 
        if (!client.config.databaseUrl) return;
        mongoose.connect(client.config.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            client.logger.log(`[DATABASE] Connected to MongoDB Database!`, "log")
            client.logger.log(`[DATABASE] Database is now ready`, "ready")
        }).catch((err) => {
            client.logger.log(err, "error")
        });
        mongoose.connection.on('disconnected', () => {
            client.logger.log('[DATABASE] Mongoose disconnected', "warn");
        });

        //Music System
        const channelLava = await client.channels.fetch(client.config.lavalinkChannelId)
        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('🛑 No Data Found!')
            .setDescription('Please Wait For The Information To Be Collected!')
        channelLava.bulkDelete(10);
        channelLava.send({
            embeds: [embed]
        }).then((msg) => {
            setInterval(async () => {

                const rembed = new MessageEmbed()
                    .setTitle(`Music System`)
                    .setColor("DARK_BUT_NOT_BLACK")
                    .addFields([{
                        name: "**Lavalink**",
                        value: `${client.manager.nodes.map((node) => `
                        **\`•\`Name**: ${node.options.identifier}
                        **\`•\`Status**: ${node.connected ? "<:icon_online:993231898291736576>  Online" : "<:icon_offline:993232252647514152> Offline"}
                        **\`•\`Memory Usage**: ${formatBytes(node.stats.memory.allocated)} - ${node.stats.cpu.lavalinkLoad.toFixed(2)}%
                        **\`•\`Connections**: ${node.stats.playingPlayers} / ${node.stats.players} players
                        
                        `)}`
                    }])

                msg.edit({
                    embeds: [rembed]
                });

            }, 5000);
        })

        client.manager.init(client.user.id);
        client.logger.log(`[API] ${client.user.username} is ready with ${client.guilds.cache.size} server`, "ready");

        //System Info
        const channelSys = await client.channels.fetch(client.config.systemChannelId)
        let cl1 = await si.currentLoad();
        const Sysembed = new MessageEmbed()
            .setColor('RED')
            .setTitle('🛑 No Data Found!')
            .setDescription('Please Wait For The Information To Be Collected!')
        channelSys.bulkDelete(10);
        channelSys.send({
            embeds: [Sysembed]
        }).then((msg) => {
            setInterval(async () => {

                let netdata = await si.networkStats();
                let memdata = await si.mem();
                let diskdata = await si.fsSize();
                let osdata = await si.osInfo();
                let cpudata = await si.cpu();
                let uptime = await os.uptime();

                const Sysrembed = new MessageEmbed()
                    .setTitle(`StreamNet Server`)
                    .setColor("DARK_BUT_NOT_BLACK")
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
                msg.edit({
                    embeds: [Sysrembed]
                });

            }, 5000);
        })

        // Initialising Premium Users
        const users = await User.find();
        for (let user of users) {
            client.userSettings.set(user.Id, user);
        }
        require('../../src/handlers/premium')(client)

        // Memory Data Update
        let memArray = [];

        setInterval(async () => {

            //Used Memory in GB
            memArray.push(await getMemoryUsage());

            if (memArray.length >= 14) {
                memArray.shift();
            }

            // Store in Database
            await DB.findOneAndUpdate({
                Client: true,
            }, {
                Memory: memArray,
            }, {
                upsert: true,
            });

        }, ms("5s")); //= 5000 (ms)

    },
}

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = `<:icon_offline:993232252647514152> DISCONNECTED`
            break;

        case 1:
            status = `<:icon_online:993231898291736576> CONNECTED`
            break;

        case 2:
            status = `<:icon_connecting:993232321685762048> CONNECTING`
            break;

        case 3:
            status = `<:icon_disconnecting:993232346172104756> DISCONNECTING`
            break;
    }
    return status;
}

function uptimer(seconds) {
    seconds = seconds || 0;
    seconds = Number(seconds);
    seconds = Math.abs(seconds);

    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var parts = new Array();

    if (d > 0) {
        var dDisplay = d > 0 ? d + ' ' + (d == 1 ? "day" : "days") : "";
        parts.push(dDisplay);
    }

    if (h > 0) {
        var hDisplay = h > 0 ? h + ' ' + (h == 1 ? "hour" : "hours") : "";
        parts.push(hDisplay)
    }

    if (m > 0) {
        var mDisplay = m > 0 ? m + ' ' + (m == 1 ? "minute" : "minutes") : "";
        parts.push(mDisplay)
    }

    if (s > 0) {
        var sDisplay = s > 0 ? s + ' ' + (s == 1 ? "second" : "seconds") : "";
        parts.push(sDisplay)
    }

    return parts.join(', ', parts);
}

function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    return `${(
        bytes / Math.pow(1024, Math.floor(Math.log(bytes) / Math.log(1024)))
    ).toFixed(2)} ${sizes[Math.floor(Math.log(bytes) / Math.log(1024))]}`;
}