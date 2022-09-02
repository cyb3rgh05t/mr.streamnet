const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require("../../src/index");
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

const row3 = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('shuffleMusic') //DONE
        .setStyle('SECONDARY')
        .setEmoji('🔀')
        .setDisabled(true),
        new MessageButton()
        .setCustomId('skipMusic') //DONE
        .setStyle('SECONDARY')
        .setEmoji('⏩')
        .setDisabled(true),
        new MessageButton()
        .setCustomId('pauseMusic') //DONE
        .setStyle('SECONDARY')
        .setEmoji('⏸️')
        .setDisabled(true),
        new MessageButton()
        .setCustomId('resumeMusic') //DONE
        .setStyle('SECONDARY')
        .setEmoji('⏯️')
        .setDisabled(true),
        new MessageButton()
        .setCustomId('stopMusic') //DONE
        .setStyle('SECONDARY')
        .setEmoji('⏹')
        .setDisabled(true)
    )
const row4 = new MessageActionRow()
    .addComponents(
        /*new MessageButton()
        .setCustomId('volumeDownMusic') //DONE
        .setStyle('DANGER')
        .setEmoji('🔉')
        .setDisabled(true),
        new MessageButton()
        .setCustomId('volumeUpMusic') //DONE
        .setStyle('SUCCESS')
        .setEmoji('🔊')
        .setDisabled(true),*/
        new MessageButton()
        .setCustomId('queueAdd') //DONE
        .setStyle('SECONDARY')
        .setEmoji('🎵')
        .setLabel("Lyrics")
        .setDisabled(true),
        new MessageButton()
        .setCustomId('queue') //DONE
        .setStyle('SECONDARY')
        .setEmoji('🎶')
        .setLabel("Queue")
        .setDisabled(true)
        /*new MessageButton()
        .setCustomId('lyrics') //DONE
        .setStyle('SECONDARY')
        .setEmoji('💬')
        .setLabel("Lyrics")
        .setDisabled(true)*/
    )

module.exports = {
    name: "queueEnd",
};

client.manager

    .on("queueEnd", async (player, track) => {

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const fetchedMessage = await client.channels.cache.get(player.textChannel).messages.fetch(dbFound.messageId)

        await fetchedMessage.edit({
                embeds: [new MessageEmbed().setColor("DARK_BUT_NOT_BLACK").setTitle(`⏹  Finished | Queue has ended`).setDescription(`**[${track.title}](${track.uri})**`).setImage(track.displayThumbnail("maxresdefault"))],
                components: [row3, row4]
            },
            setTimeout(() => fetchedMessage.delete(), 20000));

        //const channel = client.channels.cache.get(player.textChannel);
        //channel.send("⏹ Player stopped, Queue has ended.");

        player.destroy()
        player.disconnect()

    })