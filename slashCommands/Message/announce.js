const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "announce",
  description: "Announce something through the bot!",
  usage: "/announce [title] [message] [ping]",
  permission: "ADMINISTRATOR",
  options: [{
      name: 'title',
      type: 'STRING',
      description: 'Put your announcement title here!',
      required: true,
    },
    {
      name: 'message',
      type: 'STRING',
      description: 'Display your message you\'d like to announce!',
      required: true,
    },
    {
      name: 'color',
      type: 'STRING',
      description: 'Customize your embed color.',
      required: false,
    },
    {
      name: 'footer',
      type: 'STRING',
      description: 'Add a footer to your announcement.',
      required: false,
    },
    {
      name: 'timestamp',
      description: 'Enable timestamp?',
      type: 'BOOLEAN',
      required: false,
    },
    {
      name: 'ping',
      description: 'An additional ping to your announcement message.',
      type: 'STRING',
      required: false,
      choices: [{
          name: "@streamnet..er",
          value: "<@&694240145628463255>"
        },
        {
          name: "@supporter",
          value: "<@&807277578082713671>"
        }
      ]
    }
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const {
      options,
      user
    } = interaction;
    const title = options.getString("title");
    const message = options.getString("message");
    const color = options.getString("color");
    const footer = options.getString("footer");
    const timestamp = options.getBoolean("timestamp");
    const ping = options.getString("ping");
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${user.tag}`,
        iconURL: `${user.displayAvatarURL({dynamic: true})}`
      })
      .setTitle(`${title}`)
      .setDescription(`${message}`)

    if (color) embed.setColor(color.toUpperCase());
    if (footer) embed.setFooter({
      text: footer
    });
    if (timestamp) embed.setTimestamp();

    if (!ping) {
      interaction.reply({
        embeds: [embed]
      });
    } else {
      interaction.reply({
        content: `${ping === "<@&694240145628463255>" ? "<@&694240145628463255>" : "<@&807277578082713671>"}`,
        embeds: [embed],
        allowedMentions: {
          parse: ["roles", "users", "everyone"]
        }
      });
    }
  }
}