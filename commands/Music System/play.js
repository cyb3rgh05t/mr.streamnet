const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const util = require("../../utils/util");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "play",
    description: "Plays a song",
    usage: "/play [query]",
    public: true,
    options: [
        {
            name: "input", 
            description: "Provide the name of the song or URL.", 
            type: "STRING", 
            required: true 
        }
    ],
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
     async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: false
          });
        const { options, member, guild } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.editReply({ content: "You aren't in a voice channel. Join one to be able to play music!", ephemeral: true });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.editReply({ content: `I'm already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true });

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

                    if (res.loadType === "LOAD_FAILED") {
                        if (!player.queue.current) player.destroy();
                        return interaction.editReply({ content: "❌ An error has occured while trying to add this song." })
                    }

                    if (res.loadType === "NO_MATCHES") {
                        if (!player.queue.current) player.destroy();
                        return interaction.editReply({ content: "❌ No results found." })
                    }

                    if (res.loadType === "PLAYLIST_LOADED") {
                        player.connect();
                        player.queue.add(res.tracks);
                        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                        const playlistEmbed = new MessageEmbed()
                            .setDescription(`🎶  **${res.playlist.name} (${query})** has been added to the queue.`)
                            .addField("Enqueued", `\`${res.tracks.length}\` tracks added by ${member}`)
                        return interaction.editReply({ embeds: [playlistEmbed] })
                    }

                    if (res.loadType === "TRACK_LOADED" || res.loadType === "SEARCH_RESULT") {
                        player.connect();
                        player.queue.add(res.tracks[0]);
                    }

                    const enqueueEmbed = new MessageEmbed()
                        .setColor("DARK_BUT_NOT_BLACK")
                        .setTitle("🎶  Enqueued")
                        .setDescription(`▶️  **[${res.tracks[0].title}](${res.tracks[0].uri})**\n\n${member}`)
                        //.setFooter({ text: `${res.tracks[0].requester}` })
                        .setThumbnail(res.tracks[0].displayThumbnail("3"))
                    await interaction.editReply({ embeds: [enqueueEmbed] });

                    if (!player.playing && !player.paused && !player.queue.size) player.play()

                    if (player.queue.totalSize > 1)
                        enqueueEmbed.addField("Position in queue", `${player.queue.size - 0}`);
                    return interaction.editReply({ embeds: [enqueueEmbed] })
                
    }
}