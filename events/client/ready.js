<<<<<<< Updated upstream
const { Client } = require("discord.js");
//const public_CommandsArray = require("../../src/handlers/public")
const { databaseUrl } = require("../../src/config/config.json");
const os = require("os");
=======
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
>>>>>>> Stashed changes
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
        console.log(`[CLIENT]`.green.bold, `| Checking Client....`);
        console.log(`[CLIENT]`.green.bold, `| Logged in as ${client.user.tag}]`)
        console.log(`[CLIENT]`.green.bold, `| Client is starting....`)
        console.log(`[CLIENT]`.green.bold, `[INFO]`.yellow.bold,`| Client is now ready and online!`);

        // Commands
        //client.publicCommands = public_CommandsArray;    
        //console.log(`[COMMANDS]`.green.bold, `[INFO]`.yellow.bold, `| Loaded ${public_CommandsArray.length} global commands`);
        //require("../../src/handlers/commands")
        //client.commands = CommandsArray;
        //console.log(`[COMMANDS]`.green.bold, `[INFO]`.yellow.bold, `| Loaded ${CommandsArray.length} dev commands`);

        
        // Client Activity
            const initialStatus = setTimeout(() => {
                client.user.setPresence({
<<<<<<< Updated upstream
                    activities: [{ name: `Initalizing...`, type: "WATCHING" }],
                    status: "idle"
=======
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
>>>>>>> Stashed changes
                });
            });

<<<<<<< Updated upstream
            const statusArray = [
                `RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed(1)}%`,
                `CPU: ${(perc / 1000 ).toFixed(1)}%`,
            ];
            let index = 0;
=======
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
>>>>>>> Stashed changes

            const randTime = Math.floor(Math.random() * 5) + 1;

            setTimeout(() => {

                setInterval(() => {
                    if (index === statusArray.length) index = 0;
                    const status = statusArray[index];
    
                    client.user.setPresence({
                        activities: [{ name: status, type: "WATCHING" }],
                        status: "online"
                    });
                    index++;
                }, 5 * 1000) // Time in ms

            }, randTime) // randTime is a random number between 1 and 5 seconds


        // Initializing Database Connection 
            if(!databaseUrl) return;
            mongoose.connect(databaseUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => {
                console.log(`[DATABASE]`.green.bold, `| Database is now ready`)
                console.log(`[DATABASE]`.green.bold, `[INFO]`.yellow.bold,`| Connected to MongoDB Database!`);
            }).catch((err) => {
                console.log(`[ERROR] |`.red.bold, err)
            });

            //erela music
            
            client.manager.init(client.user.id);
        

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
