const { Client, ButtonInteraction, MessageEmbed } = require("discord.js");
const util = require("../../src/functions/util");
const DB = require("../../src/databases/musicDB");

module.exports = {
    id: "queue",
    public: true,

    /**
     * @param {ButtonInteraction} interaction 
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
        const player = interaction.client.manager.get(interaction.guildId);

        const dbFound = await DB.findOne({
            guildId: player.guild
        });

        const requester = dbFound.requesterId

        if (interaction.user.id !== requester && interaction.user.id !== client.config.ownerId) {
            return interaction.editReply({
                    embeds: [new MessageEmbed().setColor("RED").setDescription(`<:rejected:995614671128244224> Dieser Button kann nur von der Person verwendet werden, die den aktuellen Titel abgespielt hat`)]
                },
                setTimeout(() => interaction.deleteReply(), 3000));
        }

        if (!player.playing) return interaction.editReply({
                embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Es befindet sich nichts in der Warteschlange.")]
            },
            setTimeout(() => interaction.deleteReply(), 3000));
        if (!player.queue.length) return interaction.editReply({
                embeds: [new MessageEmbed().setColor("RED").setDescription("<:rejected:995614671128244224> Es befindet sich nichts in der Warteschlange.")]
            },
            setTimeout(() => interaction.deleteReply(), 3000));

        const queue = player.queue.map((t, i) => `\`${++i}.\` **${t.title}** [${member}]`);
        const chunked = util.chunk(queue, 100).map(x => x.join("\n"));
        const track = player.queue.current;

        const queueEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setAuthor({
                name: `Current queue for ${guild.name}`,
                iconURL: member.user.avatarURL({
                    dynamic: true
                }),
            })
            .setDescription(chunked[0]);

        const nowplaying = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setAuthor({
                    name: "Now Playing",
                    iconURL: member.user.avatarURL({
                        dynamic: true
                    }),
                })
            .setDescription(`▶️ [${track.title}](${track.uri})`);

        if (dbFound) await dbFound.updateOne({
            queueId: queueEmbed.id,
        });

        member.send({
            embeds: [ nowplaying, queueEmbed]
        });

        return interaction.editReply({
            embeds: [new MessageEmbed().setColor("GREEN").setDescription(`<:approved:995615632961847406> Playlist wurde dir als PM gesendet!`)]
        }, setTimeout(() => interaction.deleteReply(), 3000));


    }
}