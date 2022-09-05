const { MessageEmbed, WebhookClient } = require('discord.js');
const { inspect } = require("util");
const chalk = require("chalk");
const s = new WebhookClient({
    id: "999705430597042397",
    token: "jlWFa-XkgN-GhUopGGmUCgmiwAsxr5p-zsENN-8UWNHRg_QuQ1Dgh6cSZaIcKp2pPAKv",
});

module.exports = (client) => {
    client.on('error', err => {
        client.logger.log(err, "error")
        const ErrorEmbed = new MessageEmbed()
            .setTitle('Error')
            .setURL('https://discordjs.guide/popular-topics/errors.html#api-errors')
            .setColor('#2F3136')
            .setDescription(`\`\`\`${inspect(error, {depth: 0})}\`\`\``)

            .setTimestamp()
        return s.send({
            embeds: [ErrorEmbed]
        })
    });
    process.on("unhandledRejection", (reason, p) => {
        // const b = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(
            chalk.yellow('——————————[Unhandled Rejection/Catch]——————————\n'),
            reason, p
        )
        const unhandledRejectionEmbed = new MessageEmbed()
            .setTitle('**🟥 There was an Unhandled Rejection/Catch 🟥**')
            .setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
            .setColor('RED')
            .addFields({
                name: 'Reason',
                value: `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .addFields({
                name: 'Promise',
                value: `\`\`\`${inspect(p, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .setTimestamp()
        return s.send({
            embeds: [unhandledRejectionEmbed]
        })
    });

    process.on("uncaughtException", (err, origin) => {
        // const c = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(err, origin)
        const uncaughtExceptionEmbed = new MessageEmbed()
            .setTitle('**🟥 There was an Uncaught Exception/Catch 🟥**')
            .setColor('RED')
            .setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
            .addFields({
                name: 'Error',
                value: `\`\`\`${inspect(err, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .addFields({
                name: 'Origin',
                value: `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .setTimestamp()
        return s.send({
            embeds: [uncaughtExceptionEmbed]
        })
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {
        // const d = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(err, origin)
        const uncaughtExceptionMonitorEmbed = new MessageEmbed()
            .setTitle('**🟥 There was an Uncaught Exception Monitor 🟥**')
            .setColor('RED')
            .setURL('https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor')
            .addFields({
                name: 'Error',
                value: `\`\`\`${inspect(err, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .addFields({
                name: 'Origin',
                value: `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``.substring(0, 1000)
            })

            .setTimestamp()

        return s.send({
            embeds: [uncaughtExceptionMonitorEmbed]
        })
    });

    process.on("multipleResolves", (type, promise, reason) => {
        // const e = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        console.log(type, promise, reason)
        const multipleResolvesEmbed = new MessageEmbed()
            .setTitle('**🟥 There was an Multiple Resolve 🟥**')
            .setURL('https://nodejs.org/api/process.html#event-multipleresolves')
            .setColor('RED')
            .addFields({
                name: 'Type',
                value: `\`\`\`${inspect(type, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .addFields({
                name: 'Promise',
                value: `\`\`\`${inspect(promise, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .addFields({
                name: 'Reason',
                value: `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .setTimestamp()
        return s.send({
            embeds: [multipleResolvesEmbed]
        })
    });

    process.on("warning", (warn) => {
        // const f = client.channels.cache.get(config.ERROR_LOG_CHANNEL)
        client.logger.log(warn, "warn")
        const warningEmbed = new MessageEmbed()
            .setTitle('**🟥 There was an Uncaught Exception Monitor Warning 🟥**')
            .setColor('RED')
            .setURL('https://nodejs.org/api/process.html#event-warning')
            .addFields({
                name: 'Warn',
                value: `\`\`\`${inspect(warn, { depth: 0 })}\`\`\``.substring(0, 1000)
            })
            .setTimestamp()
        return s.send({
            embeds: [warningEmbed]
        })
    });
}