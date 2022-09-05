const { Client, MessageEmbed } = require("discord.js");
const client = require('../../src/index');
const GuildSettings = require('../../src/databases/settingsDB');

module.exports = {
  name: "messageCreate",

  async execute(message) {
    let storedSettings = await GuildSettings.findOne({
      GuildID: client.config.guildId,
    });
    if (!storedSettings) {
      const newSettings = new GuildSettings({
        GuildID: client.config.guildId,
      });
      await newSettings.save().catch((e) => {
        console.log(e);
      });
      storedSettings = await GuildSettings.findOne({
        GuildID: client.config.guildId
      });
    }

    const prefix = storedSettings.Prefix;
    if (message.content.indexOf(prefix) !== 0) return;

    if (message.author.bot || !message.guild) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.prefixcmd.get(command) || client.prefixcmd.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (!cmd) return;
    try {

      if (cmd.owner && message.author.id !== client.config.ownerId) {
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor("RED")
            .setFooter({
              text: `Some Error Occured`
            })
            .setTitle("Your are not allowed to execute this command")
            .setDescription("You Should be one of the bot owners to use this command")
          ]
        }).then(msg => setTimeout(() => msg.delete(), 5000));
      }

      if (cmd.permissions && cmd.permissions.length > 0 && !message.member.permissions.has(cmd.permissions)) {
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor("RED")
            .setFooter({
              text: `Some Error Occured`
            })
            .setTitle("Your are not allowed to execute this command")
            .setDescription("You Dont Have Enough Permissons to use this command")
          ]
        }).then(msg => setTimeout(() => msg.delete(), 5000));
      }
      cmd.run(client, message, args);

    } catch (error) {
      client.logger.log(error, "error")
    }

  },
};