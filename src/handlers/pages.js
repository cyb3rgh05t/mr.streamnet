const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    embedPages: async (client, interaction, embeds) => {
        const pages = {};
        const getRow = (id) => {
            //Create the action row with buttons
            const row = new MessageActionRow();

            row.addComponents(
                new MessageButton()
                .setLabel('◀')
                .setCustomId('prev_embed')
                .setStyle("PRIMARY")
                .setDisabled(pages[id] === 0)
            );

            row.addComponents(
                new MessageButton()
                .setLabel('▶')
                .setCustomId('next_embed')
                .setStyle("PRIMARY")
                .setDisabled(pages[id] === embeds.length - 1)
            );

            // -------------- Any other custom Button (if needed) --------------
            //   row.addComponents(
            //     new MessageButton()
            //       .setLabel('Any label you want')
            //       .setCustomId('custom_id')
            //       .setStyle("PRIMARY")
            //   );
            // -------------- Any other custom Button (if needed) --------------
            return row;
        };

        const id = interaction.user.id;
        pages[id] = pages[id] || 0;
        let Pagemax = embeds.length;

        const embed = embeds[pages[id]];

        await embeds[pages[id]].setFooter({
            text: `Page ${pages[id] + 1} from ${Pagemax}`,
        });

        const replyEmbed = await interaction.reply({
            embeds: [embed],
            components: [getRow(id)],
            ephemeral: true,
            fetchReply: true,
        });

        const filter = (i) => i.user.id === interaction.user.id;
        const time = 1000 * 60 * 5;

        const collector = await replyEmbed.createMessageComponentCollector({
            filter,
            time,
        });

        collector.on('collect', async (b) => {
            if (!b) return;
            if (b.customId !== 'prev_embed' && b.customId !== 'next_embed') return;

            b.deferUpdate();

            if (b.customId === 'prev_embed' && pages[id] > 0) {
                --pages[id];
            } else if (b.customId === 'next_embed' && pages[id] < embeds.length - 1) {
                ++pages[id];
            }

            await embeds[pages[id]].setFooter({
                text: `Page ${pages[id] + 1} of ${Pagemax}`,
            });

            await interaction.editReply({
                embeds: [embeds[pages[id]]],
                components: [getRow(id)],
                ephemeral: true,
                fetchReply: true,
            });
        });

        collector.on('end', async (reason) => {
            if (reason === 'time') {
                const warningEmbed = new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`⚠️ |  Unfortunately, the embed has expired!`);

                await interaction.editReply({
                    embeds: [warningEmbed],
                    components: [],
                    ephemeral: true,
                });
            }
        });
    },
};