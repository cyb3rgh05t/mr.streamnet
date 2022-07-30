const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");
const colors = require("colors");


module.exports = {
    name: "giveaway",
    description: "A complete giveaway system.",
    usage: "/giveaway [command]",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "start",
            description: "Start a giveaway.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "Provide a duration for this giveaway (1m, 1h, 1d)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "winners",
                    description: "Select the amount of winners for this giveaway.",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "prize",
                    description: "Provide the name if the prize",
                    type: "STRING",
                    required: true
                },
                {
                    name: "channel",
                    description: "Select a channel to send the giveaway to.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        },
        {
            name: "actions",
            description: "Options for giveaways.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option.",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "delete",
                            value: "delete"
                        },
                    ]
                },
                {
                    name: "message-id",
                    description: "Provide the message id of the giveaway.",
                    type: "STRING",
                    required: true
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const { options } = interaction;

        const Sub = options.getSubcommand();

        const errorEmbed = new MessageEmbed()
        .setColor("RED");

        const successEmbed = new MessageEmbed()
        .setColor("GREEN");

        switch(Sub) {
            case "start" : {
                
                const gchannel = options.getChannel("Channel") || interaction.channel;
                const duration = options.getString("duration");
                const winnerCount = options.getInteger("winners");
                const prize = options.getString("prize");

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages : {
                        giveaway: '<:streamnet:855771751820296232>🎉 **GEWINNSPIEL** 🎉<:streamnet:855771751820296232>',
                        giveawayEnded: '<:streamnet:855771751820296232>🎉 **GEWINNSPIEL BEENDED** 🎉<:streamnet:855771751820296232>',
                        inviteToParticipate: 'Reagiere mit <:streamnet:855771751820296232> um teilzunehmen!',
                        drawing: 'Restzeit: {timestamp}',
                        dropMessage: 'Sei der erste der mit <:streamnet:855771751820296232> reagiert!',
                        winMessage: 'Herzlichen Glückwunsch, {winners}! Du hast **{this.prize}** gewonnen!',
                        noWinner: 'Gewinnspiel abgesagt, keine gültigen Teilnahmen',
                        embedFooter: '{this.winnerCount} Gewinner',
                        hostedBy: 'Hosted von: {this.hostedBy}',
                    }
                }).then(async () => {
                    successEmbed.setDescription("Gewinnspiel wurde erfolgreich gestartet.")
                    return interaction.reply({embeds: [successEmbed], ephemeral: true});
                }).catch((err) => {
                    errorEmbed.setDescription(`An error has occured\n\`${err}\``)
                    return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                })


            }
            break;

            case "actions" : {
                const choice = options.getString("options");
                const messageId = options.getString("message-id");

                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

                if (!giveaway) {
                    errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageid} in this guild.`);
                    return interaction.rely({embeds: [errorEmbed], ephemeral: true})
                }
                
                
                switch(choice) {
                    case "end" : {
                        client.giveawaysManager
                        .end(messageId)
                        .then(() => {
                            successEmbed.setDescription("Gewinnspiel wurde beendet.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        })
                        .catch((err) => {
                            errorEmbed.setDescription(`An error has occurred\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "pause" : {
                        client.giveawaysManager
                        .paused(messageId)
                        .then(() => {
                            successEmbed.setDescription("Gewinnspiel wurde pausiert.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        })
                        .catch((err) => {
                            errorEmbed.setDescription(`An error has occured\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });

                    }
                    break;

                    case "unpause" : {
                        client.giveawaysManager
                        .unpaused(messageId)
                        .then(() => {
                            successEmbed.setDescription("Gewinnspiel wurde wieder gestartet.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        })
                        .catch((err) => {
                            errorEmbed.setDescription(`An error has occured\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });

                    }
                    break;

                    case "reroll" : {
                        client.giveawaysManager
                        .reroll(messageId)
                        .then(() => {
                            successEmbed.setDescription("Gewinnspiel wurde neu gestartet.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        })
                        .catch((err) => {
                            errorEmbed.setDescription(`An error has occured\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });

                    }
                    break;

                    case "delete" : {
                        client.giveawaysManager
                        .delete(messageId)
                        .then(() => {
                            successEmbed.setDescription("Gewinnspiel has been deleted.");
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        })
                        .catch((err) => {
                            errorEmbed.setDescription(`An error has occured\n\`${err}\``)
                            return interaction.reply({embeds: [errorEmbed], ephemeral: true});
                        });

                    }
                    break;
                }
            }
            break;

            default : {
                console.log(`[ERROR]`.red.bold,"Error in giveaway command.")
            }
        }
        
    }
}