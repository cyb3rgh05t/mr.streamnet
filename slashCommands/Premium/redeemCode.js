const { CommandInteraction, Client } = require("discord.js");
const moment = require("moment");
const schema = require("../../src/databases/codeDB");
const User = require("../../src/databases/userDB");

module.exports = {
  name: "redeem",
  description: `Redeem a premium code`,
  usage: "/redeem [code]",
  public: true,
  options: [{
    name: "code",
    description: `give me code`,
    type: "STRING",
    required: true,
  }, ],
  /**
   * @param {CommandInteraction} interaction 
   * @param {Client} client
   */
  async execute(interaction, client) {
    
    let user = await User.findOne({
      Id: interaction.user.id,
    });

    let code = interaction.options.getString("code");

    if (!code) {
      interaction.reply(`**Please specify the code you want to redeem!**`);
    }

    if (user && user.isPremium) {
      return interaction.reply(`**> You already are a premium user**`);
    }

    const premium = await schema.findOne({
      code: code.toUpperCase(),
    });

    if (premium) {
      const expires = moment(premium.expiresAt).format(
        "dddd, MMMM Do YYYY HH:mm:ss"
      );

      user.isPremium = true;
      user.premium.redeemedBy.push(interaction.user);
      user.premium.redeemedAt = Date.now();
      user.premium.expiresAt = premium.expiresAt;
      user.premium.plan = premium.plan;

      user = await user.save({
        new: true
      }).catch(() => {});
      client.userSettings.set(interaction.user.id, user);
      await premium.deleteOne().catch(() => {});

      interaction.reply(
        `**You have successfully redeemed premium!**\n\n\`Expires at: ${expires}\``
      );

    } else {
      return interaction.reply(
        `**The code is invalid. Please try again using valid one!**`
      );
    }
  },
}