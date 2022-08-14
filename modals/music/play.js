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
    id: "playMusic_modal",
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const {
            options,
            member,
            guild
        } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Du befindest dich nicht in einem Sprachkanal. Schließe dich einem an, um Musik spielen zu können!")]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("Ich spiele bereits Musik in <#${guild.me.voice.channelId}>.!")]
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

        const query = interaction.fields.getTextInputValue("playMusic_input");

        res = await player.search(query, interaction.user.username);

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        if (dbFound) await dbFound.updateOne({
            guildId: player.guild,
            voiceChannelId: player.voiceChannel,
            channelId: player.textChannel,
            requesterId: member,
            volume: player.volume,
        });

        else await DB.create({
            guildId: player.guild,
            voiceChannelId: player.voiceChannel,
            channelId: player.textChannel,
            requesterId: member,
            volume: player.volume,


        });

        if (res.loadType === "LOAD_FAILED") {
            if (!player.queue.current) player.destroy();
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Beim Hinzufügen dieses Titels ist ein Fehler aufgetreten.")]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        }

        if (res.loadType === "NO_MATCHES") {
            if (!player.queue.current) player.destroy();
            return interaction.reply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Keine Ergebnisse gefunden.")]
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
                value: `${member}`,
                inline: true
            })
        await interaction.reply({
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