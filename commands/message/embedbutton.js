const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, Message } = require('discord.js')
const db = require("../../src/databases/embedDB");

module.exports = {
    name: 'embedbutton',
    description: 'Create custom embed message',
    usage: "/embedbutton [channel]",
    permission: "SEND_MESSAGES",
    options: [
        {
            name: "channel",
            description: "Choose channel target",
            type: "CHANNEL",
            required: true
        }
    ],

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
        .setTitle("Titel")
        .setDescription("Beschreibung")
        .setFooter({text: "Fußzeile mit Text & Icon"})
        .setAuthor({name: "Autorzeile mit Text & Icon"})
        .setFields([
            {
                name: "Feldname",
                value: "Feldinhalt"
            }
        ])
        .setColor("GREY")

        const Embed2 = new MessageEmbed()
        .setDescription("\u200b")
        .setColor("GREY")

        const Row = new MessageActionRow()
        .addComponents([
            new MessageButton()
            .setLabel("Titel")
            .setCustomId("ce_title")
            .setStyle("PRIMARY"),

            new MessageButton()
            .setLabel("Beschreibung")
            .setCustomId("ce_description")
            .setStyle("PRIMARY"),

            new MessageButton()
            .setLabel("Fußzeile")
            .setCustomId("ce_footer")
            .setStyle("PRIMARY"),

            new MessageButton()
            .setLabel("Autorzeile")
            .setCustomId("ce_author")
            .setStyle("PRIMARY"),

            new MessageButton()
            .setLabel("Embed Farbe")
            .setCustomId("ce_color")
            .setStyle("PRIMARY")
            
        ])

        const Row2 = new MessageActionRow()
        .addComponents(
            [
                new MessageButton()
                .setLabel("Feld hinzufügen")
                .setCustomId("ce_addField")
                .setStyle("PRIMARY"),

                new MessageButton()
                .setLabel("Feld entfernen")
                .setCustomId("ce_removeField")
                .setStyle("PRIMARY"),
    
                new MessageButton()
                .setLabel("Thumbnail")
                .setCustomId("ce_thumbnail")
                .setStyle("PRIMARY"),

                new MessageButton()
                .setLabel("Banner")
                .setCustomId("ce_banner")
                .setStyle("PRIMARY")
            ]
        )

        const Row3 = new MessageActionRow()
        .addComponents(
            [
                new MessageButton()
                .setLabel("Senden")
                .setCustomId("ce_send")
                .setStyle("SUCCESS"),
                
                new MessageButton()
                .setLabel("Reset")
                .setCustomId("ce_reset")
                .setStyle("DANGER")
            ]
        )

        await interaction.reply({content: "Benutze dieses Menü um dein eigenes Embed zu erstellen!\nSolltest du das Menü nicht benutzen, wird es sich automatisch in 10 Minuten löschen!", ephemeral: true})
        const message = await interaction.channel.send({embeds: [Embed1, Embed2], components: [Row, Row2, Row3]}).catch((err) => console.error(err.message));
        await db.create({userId: m.id, messageId: message.id, finalChannel: zc.id}).catch((err) => console.error(err.message))


        setTimeout(async function() {

            await db.deleteOne({userId: m.user.id, messageId: message.id}).catch((err) => {throw err});
            if(!message.deletable) return;
            message.delete()

        }, 600000)
    }
}