const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, Message } = require('discord.js')
const db = require("../../src/databases/embedDB");

module.exports = {
    name: 'embedbutton',
    description: 'Create custom embed message',
    usage: "/embedbutton [channel]",
    permission: "SEND_MESSAGES",
    options: [{
        name: "channel",
        description: "Choose channel target",
        type: "CHANNEL",
        required: true
    }],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        const i = interaction;
        const c = i.channel;
        const g = i.guild;
        const m = i.member;
        const zc = i.options.getChannel("channel")



        const Embed1 = new MessageEmbed()
            .setTitle("Title")
            .setDescription("Description")
            .setFooter({
                text: "Footer with text & icon"
            })
            .setAuthor({
                name: "Author with text & icon"
            })
            .setFields([{
                name: "Field name",
                value: "Field value"
            }])
            .setColor("GREY")

        const Embed2 = new MessageEmbed()
            .setDescription("\u200b")
            .setColor("GREY")

        const Row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                .setLabel("Title")
                .setCustomId("title")
                .setStyle("PRIMARY"),

                new MessageButton()
                .setLabel("Description")
                .setCustomId("description")
                .setStyle("PRIMARY"),

                new MessageButton()
                .setLabel("Footer")
                .setCustomId("footer")
                .setStyle("PRIMARY"),

                new MessageButton()
                .setLabel("Author")
                .setCustomId("author")
                .setStyle("PRIMARY"),

                new MessageButton()
                .setLabel("Color")
                .setCustomId("color")
                .setStyle("PRIMARY")

            ])

        const Row2 = new MessageActionRow()
            .addComponents(
                [
                    new MessageButton()
                    .setLabel("add Field")
                    .setCustomId("addField")
                    .setStyle("PRIMARY"),

                    new MessageButton()
                    .setLabel("remove Field")
                    .setCustomId("removeField")
                    .setStyle("PRIMARY"),

                    new MessageButton()
                    .setLabel("Thumbnail")
                    .setCustomId("thumbnail")
                    .setStyle("PRIMARY"),

                    new MessageButton()
                    .setLabel("Banner")
                    .setCustomId("banner")
                    .setStyle("PRIMARY")
                ]
            )

        const Row3 = new MessageActionRow()
            .addComponents(
                [
                    new MessageButton()
                    .setLabel("Send")
                    .setCustomId("send")
                    .setStyle("SUCCESS"),

                    new MessageButton()
                    .setLabel("Reset")
                    .setCustomId("reset")
                    .setStyle("DANGER")
                ]
            )

        await interaction.reply({
            content: "Benutze dieses Menü um dein eigenes Embed zu erstellen!\nSolltest du das Menü nicht benutzen, wird es sich automatisch in 10 Minuten löschen!",
            ephemeral: true
        })
        const message = await interaction.channel.send({
            embeds: [Embed1, Embed2],
            components: [Row, Row2, Row3]
        }).catch((err) => console.error(err.message));
        await db.create({
            userId: m.id,
            messageId: message.id,
            finalChannel: zc.id
        }).catch((err) => console.error(err.message))


        setTimeout(async function () {

            await db.deleteOne({
                userId: m.user.id,
                messageId: message.id
            }).catch((err) => {
                throw err
            });
            if (!message.deletable) return;
            message.delete()

        }, 600000)
    }
}