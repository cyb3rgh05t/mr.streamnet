const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../../src/index");
const DB = require("../../src/databases/musicDB");

module.exports = {
    name: "queueEnd",
};

client.manager

    .on("queueEnd", async (player, track) => {

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const row3 = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('shuffleMusic').setStyle('SECONDARY').setEmoji('🔀').setDisabled(true),       
                new MessageButton().setCustomId('skipMusic').setStyle('SECONDARY').setEmoji('⏩').setDisabled(true),
                new MessageButton().setCustomId('pauseMusic').setStyle('SECONDARY').setEmoji('⏸️').setDisabled(true),
                new MessageButton().setCustomId('resumeMusic').setStyle('SECONDARY').setEmoji('⏯️').setDisabled(true),
                new MessageButton().setCustomId('stopMusic').setStyle('SECONDARY').setEmoji('⏹').setDisabled(true)
                )
        const row4 = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('volumeDownMusic').setStyle('DANGER').setEmoji('🔉').setDisabled(true),
                new MessageButton().setCustomId('volumeUpMusic').setStyle('SUCCESS').setEmoji('🔊').setDisabled(true),
                new MessageButton().setCustomId('queueAdd').setStyle('SECONDARY').setEmoji('➕').setLabel("Song").setDisabled(true),
                new MessageButton().setCustomId('queue').setStyle('SECONDARY').setEmoji('🎧').setLabel("Queue").setDisabled(true),
                new MessageButton().setCustomId('lyrics').setStyle('SECONDARY').setEmoji('💬').setLabel("Lyrics").setDisabled(true)
                )

        const fetchedMessage = await client.channels.cache.get(player.textChannel).messages.fetch(dbFound.messageId)

        await fetchedMessage.edit({
                embeds: [new MessageEmbed()
                    .setColor("DARK_BUT_NOT_BLACK")
                    .setTitle(`⏹ Queue has ended`)
                    .setDescription(`**[${track.title}](${track.uri})**`)
                    .setImage(track.displayThumbnail("maxresdefault"))],
                components: [row3, row4]
            },
            setTimeout(() => fetchedMessage.delete(), 10000));
            client.logger.log(`[LAVALINK] Queue ended! Player destroyed in [${player.voiceChannel}]`, "log");
        player.destroy()
        player.disconnect()

    })