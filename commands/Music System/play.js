const {
    CommandInteraction,
    MessageEmbed,
    Client
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
    name: "play",
    description: "Plays a song",
    usage: "/play [query]",
    public: true,
    options: [{
        name: "input",
        description: "Provide the name of the song or URL.",
        type: "STRING",
        required: true
    }],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: false
        });
        const {
            options,
            member,
            guild
        } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.editReply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("❌ You aren't in a voice channel. Join one to be able to play music!")]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.editReply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("I'm already playing music in <#${guild.me.voice.channelId}>.!")]
                },
                setTimeout(() => interaction.deleteReply(), 3000));

        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: member.voice.channel.id,
            textChannel: interaction.channelId,
            selfDeafen: true,
            volume: 100
        });

        let res;
        const query = interaction.options.getString("input");
        res = await player.search(query, interaction.user.username);

        await DB.create({
            guildId: player.guild,
            voiceChannelId: player.voiceChannel,
            channelId: player.textChannel,
            requesterId: member,
            volume: player.volume,
        });

        if (res.loadType === "LOAD_FAILED") {
            if (!player.queue.current) player.destroy();
            return interaction.editReply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("❌ An Error occured while adding this song.")]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        }

        if (res.loadType === "NO_MATCHES") {
            if (!player.queue.current) player.destroy();
            return interaction.editReply({
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
            return interaction.editReply({
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

        //const requester = await DB.get(dbFound.requesterId)

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
        await interaction.editReply({
            embeds: [enqueueEmbed]
        });


        if (!player.playing && !player.paused && !player.queue.size) player.play()

        if (player.queue.totalSize > 1)

            enqueueEmbed.addFields({
                name: "Position in queue",
                value: `\`${player.queue.size - 0}\``
            });
        return interaction.editReply({
                embeds: [enqueueEmbed]
            },
            setTimeout(() => interaction.deleteReply(), 5000));

    }
}