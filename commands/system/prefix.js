const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const GuildSettings = require("../../src/databases/settingsDB");
const colors = require("colors");

module.exports = {
	name: "prefix",
	description: "Change guild prefix",
	usage: "/prefix [caracter]",
    permission: "ADMINISTRATOR",
	options: [
		{
		  name: "caracter",
		  description: "enter pefix",
		  type: "STRING",
		  required: true,
		},
	  ],

	/**
	 * @param {Client} client 
	 * @param {Message} message 
     * @param {CommandInteraction} interaction
	 */

	async execute(interaction, client) {
		const caracter = interaction.options.getString("caracter");
		if (!caracter[0]) return interaction.reply("Please Enter a Valid Prefix")
		if (caracter[0].length > 5) return interaction.reply("Prefix cant be above 5 charcters")
		try {

			let storedSettings = await GuildSettings.findOne({ GuildID: interaction.guild.id });
			if (!storedSettings) {
				// If there are no settings stored for this guild, we create them and try to retrive them again.
				const newSettings = new GuildSettings({ GuildID: interaction.guild.id, });
				await newSettings.save().catch((e) => {
					console.log(e);
				});
				storedSettings = await GuildSettings.findOne({ GuildID: interaction.guild.id });
			}

			storedSettings.Prefix = caracter[0];
			await storedSettings.save().catch((e) => {
				console.log(e);
			});

			interaction.reply({
				embeds: [new MessageEmbed()
					.setTitle("Prefix Changed")
					.setDescription(`Prefix changed to : \`${caracter[0]}\``)
					.setColor("RANDOM")
					.setFooter({text: `Custom Prefix Was Not So Hard To Make`})]
			})
			console.log(`[INFO]`.yellow.bold,`Client Prefix is now = "${caracter[0]}"`)

		} catch (error) {
			interaction.reply("Some Error Occured");
			console.log(`[ERROR]`.red.bold, error)
		}

	}
}