const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../../src/index");
const { Player, Track } = require("erela.js");
const DB = require("../../src/databases/musicDB");

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

module.exports = {
    name: "trackStart",
    /**
     * @param {Player} player
     * @param {Track} track
     */
};

client.manager

.on("trackStart", async (player, track) => {

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const row = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('shuffleMusic').setStyle('SECONDARY').setEmoji('🔀'),       
                new MessageButton().setCustomId('skipMusic').setStyle('SECONDARY').setEmoji('⏩'),
                new MessageButton().setCustomId('pauseMusic').setStyle('SECONDARY').setEmoji('⏸️'),
                new MessageButton().setCustomId('resumeMusic').setStyle('SECONDARY').setEmoji('⏯️'),
                new MessageButton().setCustomId('stopMusic').setStyle('SECONDARY').setEmoji('⏹')
                )
        const row2 = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('volumeDownMusic').setStyle('DANGER').setEmoji('🔉'),
                new MessageButton().setCustomId('volumeUpMusic').setStyle('SUCCESS').setEmoji('🔊'),
                new MessageButton().setCustomId('queueAdd').setStyle('SECONDARY').setEmoji('🎵').setLabel("Add Song"),
                new MessageButton().setCustomId('queue').setStyle('SECONDARY').setEmoji('🎶').setLabel(`Queue ${player.queue.size}`),
                new MessageButton().setCustomId('lyrics').setStyle('SECONDARY').setEmoji('💬').setLabel("Lyrics")
                )

        trackMsgId = await client.channels.cache.get(player.textChannel).send({
            embeds: [new MessageEmbed()
                .setColor("DARK_BUT_NOT_BLACK")
                .setTitle(`🎧 Started Playing`)
                .setDescription(`**[${track.title}](${track.uri})**`)
                .addFields({
                name: `Duration :`,
                value: `\`${msToTime(track.duration) || "Undetermined"}\``,
                inline: true

            }, {
                name: `Requester :`,
                value: `<@${dbFound.requesterId}>`,
                inline: true
            }).setImage(track.displayThumbnail("maxresdefault"))],
            components: [row, row2]
        })


        if (dbFound) await dbFound.updateOne({
            messageId: trackMsgId.id,
            channelId: player.textChannel

        });

        else await DB.create({
            guildId: player.guild,
            channelId: player.textChannel,
            messageId: trackMsgId.id,

        });
    })