const {
    Client,
    MessageEmbed
} = require("discord.js");
const {
    databaseUrl,
    lavalinkChannelId
} = require("../../src/config/config.json");
const os = require("os");
const osUtils = require("os-utils");
const ms = require("ms");
const colors = require("colors");
const mongoose = require("mongoose");
const User = require("../../src/databases/userDB");
const DB = require('../../src/databases/clientDB');

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

        }, randTime) // randTime is a random number between 1 and 5 seconds


        // Initializing Database Connection 
        if (!databaseUrl) return;
        mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            client.logger.log(`[DATABASE] Connected to MongoDB Database!`, "debug")
            client.logger.log(`[DATABASE] Database is now ready`, "ready")
        }).catch((err) => {
            client.logger.log(err, "error")
        });

        //erela music
        const channel = await client.channels.fetch(lavalinkChannelId)
        const embed = new MessageEmbed()
            .setColor("#2F3136")
            .setDescription("Please wait for a minute!\nStatus is being ready!")
        channel.bulkDelete(10);
        channel.send({
            embeds: [embed]
        }).then((msg) => {
            setInterval(() => {

                    let all = []

                    client.manager.nodes.forEach(node => {
                        let info = []
                        info.push(`Status: ${node.connected ? "🟢" : "🔴"}`)
                        info.push(`Node: ${(node.options.identifier)}`)
                        info.push(`Player: ${node.stats.players}`)
                        info.push(`Playing Players: ${node.stats.playingPlayers}`)
                        info.push(`Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}`)
                        info.push("\nCPU:")
                        info.push(`Cores: ${node.stats.cpu.cores}`)
                        info.push(`System Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%`)
                        info.push(`Lavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`)
                        all.push(info.join('\n'))
                    });
                    const rembed = new MessageEmbed()
                        .setAuthor({
                            name: 'Lavalink Node',
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setDescription(`\`\`\`${all.join('\n\n----------------------------\n')}\n\n` +
                            `Total Memory  :: ${Math.round(require('os').totalmem() / 1024 / 1024)} mb\n` +
                            `Free Memory   :: ${Math.round(require('os').freemem() / 1024 / 1024)} mb\n` +
                            `RSS           :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                            `Heap Total    :: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} mb\n` +
                            `Heap Used     :: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} mb\n` +
                            `External      :: ${Math.round(process.memoryUsage().external / 1024 / 1024)} mb\n` +
                            `Array Buffer  :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                            `CPU Model     :: ${require('os').cpus()[0].model}\n` +
                            `Cores         :: ${require('os').cpus().length}\n` +
                            `Speed         :: ${require('os').cpus()[0].speed}Mhz\n` +
                            `Platform      :: ${process.platform}\n` +
                            `PID           :: ${process.pid}\n` +
                            `\n` + `\`\`\``)
                        .setColor("#9966ff")
                        .setTimestamp(Date.now());
                    msg.edit({
                        embeds: [rembed]
                    })
                },
                2000);
        })

        client.manager.init(client.user.id);
        client.logger.log(`[API] ${client.user.username} is ready with ${client.guilds.cache.size} server`, "ready");

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