const { CommandInteraction, MessageEmbed, Client, GuildMember } = require("discord.js");
const ms = require("ms");
const DB = require("../../src/databases/modDB");
const warnModel = require("../../src/databases/warnDB");


module.exports = {
    name: "mod",
    description: "Moderation commands",
    usage: "/mod [action]",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "actions",
            description: "Permanent actions",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Pick a option from the list",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "warning", value: "warning" },
                        { name: "kick", value: "kick" },
                        { name: "ban", value: "ban" },
                    ]
                },
                {
                    name: "member",
                    description: "Select the member",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "Provide a reason",
                    type: "STRING",
                    required: true,
                },
            ]
        },
        {
            name: "temp",
            description: "Temporary actions",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Pick a option from the list",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "timeout", value: "timeout" },
                    ]
                },
                {
                    name: "duration",
                    description: "Set the duration of the timeout for the member",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "60 sec", value: "60 sec" },
                        { name: "5 mins", value: "5 mins" },
                        { name: "10 mins", value: "10 mins"},
                        { name: "1 hour", value: "1 hour" },
                        { name: "1 day", value: "1 day" },
                        { name: "1 week", value: "1 week" },
                    ]
                },
                {
                    name: "member",
                    description: "Select the member",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "Provide a reason",
                    type: "STRING",
                    required: true,
                },
            ]
        },
        {
            name: "remove",
            description: "Remove active actions",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "removal",
                    description: "Pick a removal from the list",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "remove timeout", value: "remove timeout" },
                    ]
                },
                {
                    name: "member",
                    description: "Select the member",
                    type: "USER",
                    required: true,
                },
            ]
        },       
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;

        const Data = await DB.findOne({ GuildID: guild.id });
        if (!Data) return interaction.reply({ content: "You havn't setup a mod message log yet, Please do this with [/modlogsetup]", ephemeral: true });

        const channellog = Data.ChannelID

        const Sub = options.getSubcommand();

        const user = options.getMember("member");
        const reason = options.getString("reason");
        const time = options.getString("duration");
        const id = await interaction.guild.members.fetch(user.id);

        const errorEmbed = new MessageEmbed()
        .setColor("RED");

        if(!id)
        return interaction.reply({ content: "Possible member already left on there own or something els went wrong", ephemeral: true })

        switch(Sub) {
            case "actions" : {
                const hard = options.getString("options");
            
                switch(hard) {
                    case "warning" : {
                        if(!interaction.member.permissions.has("MANAGE_MESSAGES"))
                        return interaction.reply({ content: "You do not have the right permissions to use this action", ephemeral: true });

                        if(interaction.member.roles.highest.position <= id.roles.highest.position)
                        return interaction.reply({ content: "You can't use this action on this member, this member is equal to your rank or higher", ephemeral: true })

                        new warnModel({
                            userId: user.id,
                            guildId: interaction.guild.id,
                            moderatorId: interaction.user.id,
                            reason,
                        }).save();

                        const warn = new MessageEmbed()
                            .setTitle("Succesfully warned the member")
                            .setColor("GREEN")
                            .setThumbnail(id.user.avatarURL({ dynamic: true }))
                            .setFields(
                                { name: "User ID:", value: id.id },
                                { name: "Warned By:", value: `${interaction.user}` },
                                { name: "Warn Reason:", value: reason },
                                { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true }
                            );
                        await id.send({ embeds: [new MessageEmbed()
                            .setTitle("**Warning**")
                            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                            .setColor("GREEN")
                            .setFields(
                                { name: "Discord Server", value: guild.name },
                                { name: "Warned by", value: `${interaction.user}`, inline: true },
                                { name: "Reason", value: reason, inline: true },
                        )] }).then(async () => {
                            return interaction.reply({ embeds: [warn], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription("⛔ Private message blocked by the user")
                            return interaction.reply({ embeds: [errorEmbed, warn], ephemeral: true });
                        })
                        await guild.channels.cache.get(`${channellog}`).send({ embeds: [warn] });
                    }
                    break;

                    case "kick" : {
                        if(!interaction.member.permissions.has("KICK_MEMBERS"))
                        return interaction.reply({ content: "You do not have the right permissions to use this action", ephemeral: true });

                        if(interaction.member.roles.highest.position <= id.roles.highest.position)
                        return interaction.reply({ content: "You can't use this action on this member, this member is equal to your rank or higher", ephemeral: true })

                        const kick = new MessageEmbed()
                            .setTitle("Succesfully kicked the member")
                            .setColor("ORANGE")
                            .setThumbnail(id.user.avatarURL({ dynamic: true }))
                            .setFields(
                                { name: "User ID", value: id.id },
                                { name: "Kicked By", value: `${interaction.user}` },
                                { name: "Kick Reason", value: reason },
                                { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                            );
                        await id.send({ embeds: [new MessageEmbed()
                            .setTitle("**Kicked**")
                            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                            .setColor("ORANGE")
                            .setFields(
                                { name: "Discord Server", value: guild.name },
                                { name: "Kicked by", value: `${interaction.user}`, inline: true },
                                { name: "Reason", value: reason, inline: true },
                        )] }).then(async () => {
                            return interaction.reply({ embeds: [kick], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription("⛔ Private message blocked by the user")
                            return interaction.reply({ embeds: [errorEmbed, kick], ephemeral: true });
                        })
                        await id.kick({ reason: reason });
                        await guild.channels.cache.get(`${channellog}`).send({ embeds: [kick] });
                    }
                    break;

                    case "ban" : {
                        if(!interaction.member.permissions.has("BAN_MEMBERS"))
                        return interaction.reply({ content: "You do not have the right permissions to use this action", ephemeral: true });

                        if(interaction.member.roles.highest.position <= id.roles.highest.position)
                        return interaction.reply({ content: "You can't use this action on this member, this member is equal to your rank or higher", ephemeral: true })
                
                        const ban = new MessageEmbed()
                            .setTitle("Succesfully banned the member")
                            .setColor("RED")
                            .setThumbnail(id.user.avatarURL({ dynamic: true }))
                            .setFields(
                                { name: "User ID", value: id.id },
                                { name: "Banned by", value: `${interaction.user}` },
                                { name: "Ban Reason", value: reason },
                                { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                            );
                        await id.send({ embeds: [new MessageEmbed()
                            .setTitle("**Banned**")
                            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                            .setColor("RED")
                            .setFields(
                                { name: "Discord Server", value: guild.name },
                                { name: "Banned by", value: `${interaction.user}`, inline: true },
                                { name: "Reason", value: reason, inline: true },
                        )] }).then(async () => {
                            return interaction.reply({ embeds: [ban], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription("⛔ Private message blocked by the user")
                            return interaction.reply({ embeds: [errorEmbed, ban], ephemeral: true });
                        })
                        await id.ban({ days: 0, reason: reason});
                        await guild.channels.cache.get(`${channellog}`).send({ embeds: [ban] });
                    }
                    break;
                }
            }
            break;

            case "temp": {
                const soft = options.getString("options");

                switch(soft) {
                    case "timeout" : {
                        if(!interaction.member.permissions.has("MODERATE_MEMBERS"))
                        return interaction.reply({ content: "You do not have the right permissions to use this action", ephemeral: true });

                        if(interaction.member.roles.highest.position <= id.roles.highest.position)
                        return interaction.reply({ content: "You can't use this action on this member, this member is equal to your rank or higher", ephemeral: true })

                        switch(time) {
                            case "60 sec" : {
                            const firsttm = new MessageEmbed()
                                .setTitle("Succesfully timeout the member")
                                .setColor("WHITE")
                                .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                .setFields(
                                    { name: "User ID", value: id.id },
                                    { name: "Timeout", value: "60 sec" },
                                    { name: "Timeout by", value: `${interaction.user}` },
                                    { name: "Timeout Reason", value: reason },
                                    { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                    { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                );
                            await id.send({ embeds: [new MessageEmbed()
                                .setTitle("**Timeout**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                                .setColor("WHITE")
                                .setFields(
                                    { name: "Discord Server", value: guild.name },
                                    { name: "Timeout", value: "60 sec", inline: true },
                                    { name: "Timeout by", value: `${interaction.user}`, inline: true },
                                    { name: "Reason", value: reason, inline: true },
                            )] }).then(async () => {
                                return interaction.reply({ embeds: [firsttm], ephemeral: true })
                            }).catch((err) => {
                                errorEmbed.setDescription("⛔ Private message blocked by the user")
                                return interaction.reply({ embeds: [errorEmbed, firsttm], ephemeral: true });
                            })
                            await id.timeout(ms("60s"), reason);
                            await guild.channels.cache.get(`${channellog}`).send({ embeds: [firsttm] });

                            }
                            break;
                            case "5 mins" : {
                            const secondtm = new MessageEmbed()
                                .setTitle("Succesfully timeout the member")
                                .setColor("WHITE")
                                .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                .setFields(
                                    { name: "User ID", value: id.id },
                                    { name: "Timeout", value: "5 mins" },
                                    { name: "Timeout by", value: `${interaction.user}` },
                                    { name: "Timeout Reason", value: reason },
                                    { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                    { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                );
                            await id.send({ embeds: [new MessageEmbed()
                                .setTitle("**Timeout**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                                .setColor("WHITE")
                                .setFields(
                                    { name: "Discord Server", value: guild.name },
                                    { name: "Timeout", value: "5 mins", inline: true },
                                    { name: "Timeout by", value: `${interaction.user}`, inline: true },
                                    { name: "Reason", value: reason, inline: true },
                            )] }).then(async () => {
                                return interaction.reply({ embeds: [secondtm], ephemeral: true })
                            }).catch((err) => {
                                errorEmbed.setDescription("⛔ Private message blocked by the user")
                                return interaction.reply({ embeds: [errorEmbed, secondtm], ephemeral: true });
                            })
                            await id.timeout(ms("5m"), reason);
                            await guild.channels.cache.get(`${channellog}`).send({ embeds: [secondtm] });  

                            }
                            break;
                            case "10 mins" : {
                            const thirdtm = new MessageEmbed()
                                .setTitle("Succesfully timeout the member")
                                .setColor("WHITE")
                                .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                .setFields(
                                    { name: "User ID", value: id.id },
                                    { name: "Timeout", value: "10 mins" },
                                    { name: "Timeout by", value: `${interaction.user}` },
                                    { name: "Timeout Reason", value: reason },
                                    { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                    { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                );
                            await id.send({ embeds: [new MessageEmbed()
                                .setTitle("**Timeout**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                                .setColor("WHITE")
                                .setFields(
                                    { name: "Discord Server", value: guild.name },
                                    { name: "Timeout", value: "10 mins", inline: true },
                                    { name: "Timeout by", value: `${interaction.user}`, inline: true },
                                    { name: "Reason", value: reason, inline: true },
                            )] }).then(async () => {
                                return interaction.reply({ embeds: [thirdtm], ephemeral: true })
                            }).catch((err) => {
                                errorEmbed.setDescription("⛔ Private message blocked by the user")
                                return interaction.reply({ embeds: [errorEmbed, thirdtm], ephemeral: true });
                            })
                            await id.timeout(ms("10m"), reason);
                            await guild.channels.cache.get(`${channellog}`).send({ embeds: [thirdtm] });  

                            }
                            break;
                            case "1 hour" : {
                            const fourthtm = new MessageEmbed()
                                .setTitle("Succesfully timeout the member")
                                .setColor("WHITE")
                                .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                .setFields(
                                    { name: "User ID", value: id.id },
                                    { name: "Timeout", value: "1 hour" },
                                    { name: "Timeout by", value: `${interaction.user}` },
                                    { name: "Timeout Reason", value: reason },
                                    { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                    { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                );
                            await id.send({ embeds: [new MessageEmbed()
                                .setTitle("**Timeout**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                                .setColor("WHITE")
                                .setFields(
                                    { name: "Discord Server", value: guild.name },
                                    { name: "Timeout", value: "1 hour", inline: true },
                                    { name: "Timeout by", value: `${interaction.user}`, inline: true },
                                    { name: "Reason", value: reason, inline: true },
                            )] }).then(async () => {
                                return interaction.reply({ embeds: [fourthtm], ephemeral: true })
                            }).catch((err) => {
                                errorEmbed.setDescription("⛔ Private message blocked by the user")
                                return interaction.reply({ embeds: [errorEmbed, fourthtm], ephemeral: true });
                            })
                            await id.timeout(ms("1h"), reason);
                            await guild.channels.cache.get(`${channellog}`).send({ embeds: [fourthtm] });

                            }
                            break;
                            case "1 day" : {
                            const fifthtm = new MessageEmbed()
                                .setTitle("Succesfully timeout the member")
                                .setColor("WHITE")
                                .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                .setFields(
                                    { name: "User ID", value: id.id },
                                    { name: "Timeout", value: "1 day" },
                                    { name: "Timeout by", value: `${interaction.user}` },
                                    { name: "Timeout Reason", value: reason },
                                    { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                    { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                );
                            await id.send({ embeds: [new MessageEmbed()
                                .setTitle("**Timeout**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                                .setColor("WHITE")
                                .setFields(
                                    { name: "Discord Server", value: guild.name },
                                    { name: "Timeout", value: "1 day", inline: true },
                                    { name: "Timeout by", value: `${interaction.user}`, inline: true },
                                    { name: "Reason", value: reason, inline: true },
                            )] }).then(async () => {
                                return interaction.reply({ embeds: [fifthtm], ephemeral: true })
                            }).catch((err) => {
                                errorEmbed.setDescription("⛔ Private message blocked by the user")
                                return interaction.reply({ embeds: [errorEmbed, fifthtm], ephemeral: true });
                            })
                            await id.timeout(ms("1d"), reason);
                            await guild.channels.cache.get(`${channellog}`).send({ embeds: [fifthtm] });

                            }
                            break;
                            case "1 week" : {
                                const sixthtm = new MessageEmbed()
                                    .setTitle("Succesfully timeout the member")
                                    .setColor("WHITE")
                                    .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                    .setFields(
                                        { name: "User ID", value: id.id },
                                        { name: "Timeout", value: "1 week" },
                                        { name: "Timeout by", value: `${interaction.user}` },
                                        { name: "Timeout Reason", value: reason },
                                        { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                        { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                    );
                                await id.send({ embeds: [new MessageEmbed()
                                    .setTitle("**Timeout**")
                                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                                    .setColor("WHITE")
                                    .setFields(
                                        { name: "Discord Server", value: guild.name },
                                        { name: "Timeout", value: "1 week", inline: true },
                                        { name: "Timeout by", value: `${interaction.user}`, inline: true },
                                        { name: "Reason", value: reason, inline: true },
                            )] }).then(async () => {
                                return interaction.reply({ embeds: [sixthtm], ephemeral: true })
                            }).catch((err) => {
                                errorEmbed.setDescription("⛔ Private message blocked by the user")
                                return interaction.reply({ embeds: [errorEmbed, sixthtm], ephemeral: true });
                            })
                            await id.timeout(ms("1w"), reason);
                            await guild.channels.cache.get(`${channellog}`).send({ embeds: [sixthtm] });

                            }
                            break;
                        }
                    }
                    break;
                }
            }
            break;

            case "remove" : {
                const removal = options.getString("removal");

                if(interaction.member.roles.highest.position <= id.roles.highest.position)
                return interaction.reply({ content: "You can't use this action on this member, this member is equal to your rank or higher", ephemeral: true })

                switch(removal) {
                    case "remove timeout" : {
                        if(!interaction.member.permissions.has("MODERATE_MEMBERS"))
                        return interaction.reply({ content: "You do not have the right permissions to use this action", ephemeral: true });

                        const tmremoval = new MessageEmbed()
                            .setTitle("Succesfully removed timeout from member")
                            .setColor("GREEN")
                            .setThumbnail(id.user.avatarURL({ dynamic: true }))
                            .setFields(
                                { name: "User ID", value: id.id },
                                { name: "Timeout", value: "Removed" },
                                { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                            );
                        await id.send({ embeds: [new MessageEmbed()
                            .setTitle("**Timeout Removed**")
                            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({Dynamic: true, size: 512}) })
                            .setColor("GREEN")
                            .setFields(
                                { name: "Discord Server", value: guild.name },
                                { name: "Timeout removed by", value: `${interaction.user}`, inline: true },
                                { name: "Timeout", value: "Removed", inline: true },
                        )] }).then(async () => {
                            return interaction.reply({ embeds: [tmremoval], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription("⛔ Private message blocked by the user")
                            return interaction.reply({ embeds: [errorEmbed, tmremoval], ephemeral: true });
                        })
                        await id.timeout(null);
                        await guild.channels.cache.get(`${channellog}`).send({ embeds: [tmremoval] });

                    }
                    break;
                }
            }
            break;
        }
    } 
}