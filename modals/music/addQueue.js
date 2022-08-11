const {
    MessageActionRow,
    MessageButton,
    Modal,
    MessageEmbed,
    ModalSubmitInteraction,
    Client,
    TextInputComponent
} = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();
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
    id: "addMusic_modal",
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const player = client.manager.get(interaction.guildId);


        let res;

        const query = interaction.fields.getTextInputValue("addMusic_input");

        res = await player.search(query, interaction.user.username);

        if (res.loadType === "LOAD_FAILED") {
            if (!player.queue.current) player.destroy();
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("❌ An Error occured while adding this song.")]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        }

        if (res.loadType === "NO_MATCHES") {
            if (!player.queue.current) player.destroy();
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("❌ No Results found.")]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        }

        if (res.loadType === "PLAYLIST_LOADED") {
            player.connect();
            player.queue.add(res.tracks);
            if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
            const playlistEmbed = new MessageEmbed()
                .setDescription(`🎶  **${res.playlist.name}** has been added to the queue.`)
                .addField("Enqueued", `\`${res.tracks.length}\` tracks added by ${member}`)
            return interaction.reply({
                embeds: [playlistEmbed]
            })
        }

        if (res.loadType === "TRACK_LOADED" || res.loadType === "SEARCH_RESULT") {
            player.connect();
            player.queue.add(res.tracks[0]);
        }

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const enqueueEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle("🎶  Enqueued")
            .setDescription(`▶️  **[${res.tracks[0].title}](${res.tracks[0].uri})**`)
            //.setFooter({ text: `${res.tracks[0].requester}` })
            .setThumbnail(res.tracks[0].displayThumbnail("3"))
            .addFields({
                name: `Duration :`,
                value: `\`${msToTime(res.tracks[0].duration) || "Undetermined"}\``,
                inline: true

            }, {
                name: `Requester :`,
                value: `<@${dbFound.requesterId}>`,
                inline: true
            })
            .addFields({
                name: "Position in queue",
                value: `\`${player.queue.size - 0}\``
            });

        if (!player.playing && !player.paused && !player.queue.size) player.play()

        if (player.queue.totalSize > 1)

            await interaction.reply({
                    embeds: [enqueueEmbed]
                },
                setTimeout(() => interaction.deleteReply(), 5000));

    }
}