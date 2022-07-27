const { MessageActionRow, MessageButton, Modal, MessageEmbed, ButtonInteraction, Client, TextInputComponent } = require("discord.js");
const db = require("../../src/databases/embedDB");


module.exports = {
    id: "ce_removeField",
    permission: "MANAGE_MESSAGES",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */


    async execute(interaction, client) {
        const i = interaction;
        const m = i.member;
        const g = i.guild;
        const c = i.channel;
        const ShowEmbed = i.message.embeds[0];
        const PrevEmbed = i.message.embeds[1];
        const mRow1 = i.message.components[0];
        const mRow2 = i.message.components[1];
        const mRow3 = i.message.components[2];

        db.findOne({messageId: i.message.id, userId: m.id}, async (err, data) => {
            if(err) throw err;
            if(!data) return interaction.reply({content: "Dieses Menü gehört nicht dir!", ephemeral: true}).catch((err) => console.error(err.message));

            const Row1 = new MessageActionRow()
            const Row2 = new MessageActionRow()
            const Row3 = new MessageActionRow()
            const Row4 = new MessageActionRow()
            const Row5 = new MessageActionRow()
            const Row0 = new MessageActionRow()
            .addComponents([
                new MessageButton()
                .setLabel("Alle entfernen")
                .setCustomId("remove_all_fields")
                .setStyle("DANGER")
            ])


            if(PrevEmbed.fields.length == 0) return interaction.reply({content: "Dein Embed hat derzeit kein Feld!", ephemeral: true}).catch((err) => console.error(err.message));

            PrevEmbed.fields.forEach((f) => {
                if(Row1.components.length != 5) {
                    Row1.addComponents([
                        new MessageButton()
                        .setLabel(`${f.name}`)
                        .setCustomId(`${f.name}`)
                        .setStyle("PRIMARY")
                    ])
                } else if(Row2.components.length != 5) {
                    Row2.addComponents([
                        new MessageButton()
                        .setLabel(`${f.name}`)
                        .setCustomId(`${f.name}`)
                        .setStyle("PRIMARY")
                    ])
                } else if(Row3.components.length != 5) {
                    Row3.addComponents([
                        new MessageButton()
                        .setLabel(`${f.name}`)
                        .setCustomId(`${f.name}`)
                        .setStyle("PRIMARY")
                    ])
                } else if(Row4.components.length != 5) {
                    Row4.addComponents([
                        new MessageButton()
                        .setLabel(`${f.name}`)
                        .setCustomId(`${f.name}`)
                        .setStyle("PRIMARY")
                    ])
                } else {
                    Row5.addComponents([
                        new MessageButton()
                        .setLabel(`${f.name}`)
                        .setCustomId(`${f.name}`)
                        .setStyle("PRIMARY")
                    ])
                }
                
            })

            if(Row5.components.length >= 1) {
                interaction.reply({components: [Row1, Row2, Row3, Row4, Row5, Row0]}).catch((err) => console.error(err.message));
            } else if(Row4.components.length >= 1) {
                interaction.reply({components: [Row1, Row2, Row3, Row4, Row0]}).catch((err) => console.error(err.message));
            } else if(Row3.components.length >= 1) {
                interaction.reply({components: [Row1, Row2, Row3, Row0]}).catch((err) => console.error(err.message));
            } else if(Row2.components.length >= 1) {
                interaction.reply({components: [Row1, Row2, Row0]}).catch((err) => console.error(err.message));
            } else {
                interaction.reply({components: [Row1, Row0]}).catch((err) => console.error(err.message));
            }

            const PrevEmbed2 = new MessageEmbed()

            if(PrevEmbed.title == null) {
                PrevEmbed2.setTitle("  ")
            } else {
                PrevEmbed2.setTitle(`${PrevEmbed.title}`)
            }
    
            if(PrevEmbed.description.length == 0) {
                PrevEmbed2.setDescription("  ")
            } else {
                PrevEmbed2.setDescription(`${PrevEmbed.description}`)
            }
    
            if(PrevEmbed.author == null) {
                PrevEmbed2.setAuthor({name: "  "})
            } else {
                if(PrevEmbed.author.iconURL == null) {
                    PrevEmbed2.setAuthor({name: `${PrevEmbed.author.name}`})
                } else {
                    PrevEmbed2.setAuthor({name: `${PrevEmbed.author.name}`, iconURL: `${PrevEmbed.author.iconURL}`})
                }
            }
    
            if(PrevEmbed.footer == null) {
                PrevEmbed2.setFooter({text: "  "})
            } else {
                if(PrevEmbed.footer.iconURL == null) {
                    PrevEmbed2.setFooter({text: `${PrevEmbed.footer.text}`})
                } else {
                    PrevEmbed2.setFooter({text: `${PrevEmbed.footer.text}`, iconURL: `${PrevEmbed.footer.iconURL}`})
                }   
            }
    
            if(PrevEmbed.thumbnail != null) {
                PrevEmbed2.setThumbnail(`${PrevEmbed.thumbnail.url}`)
            }
    
            if(PrevEmbed.image != null) {
                PrevEmbed2.setImage(`${PrevEmbed.image.url}`)
            }
    
            if(PrevEmbed.color != null) {
                PrevEmbed2.setColor(`${PrevEmbed.hexColor}`)
            }
            
            const collector = c.createMessageComponentCollector({componentType: "BUTTON", time: 1200000, maxComponents: 1})
            const msg = c.messages.cache.get(data.messageId)
            const msgRow1 = msg.components[0]
            const msgRow2 = msg.components[1]
            const msgRow3 = msg.components[2]
            const msgShowEmbed = msg.embeds[0]
            const msgPrevEmbed = msg.embeds[1]
 
            collector.on("collect", async (b) => {
                if(b.member.id != m.id) return interaction.reply({content: "Diese Knöpfe sind nicht für dich!", ephemeral: true}).catch((err) => console.error(err.message));
                if(b.customId == "remove_all_fields") {
                    interaction.message.edit({
                        embeds: [ShowEmbed, PrevEmbed2],
                        components: [mRow1, mRow2, mRow3]
                    }).catch((err) => console.error(err.message))

                } else {
                    await PrevEmbed.fields.forEach((f) => {
                        if(f.name == b.customId) return;
                        PrevEmbed2.addField(`${f.name}`, `${f.value}`)
                    })

                    msg.edit({
                        embeds: [msgShowEmbed, PrevEmbed2],
                        components: [msgRow1, msgRow2, msgRow3]
                    }).catch((err) => console.error(err.message))

                    interaction.editReply({content: "Das Feld wurde erfolgreich gelöscht!", components: []}).catch((err) => console.error(err.message));

                }

            
            })

            collector.on("end", async (b) => {
                interaction.deleteReply().catch((err) => console.error(err.message))
            })

            
        })
        


    }
}