const {	CommandInteraction,	MessageEmbed,Client } = require("discord.js");
const GuildSettings = require("../../src/databases/settingsDB");

module.exports = {
	name: "prefix",
	description: "Change guild prefix",
	usage: "/prefix [caracter]",
	permission: "ADMINISTRATOR",
	options: [{
		name: "caracter",
		description: "enter pefix",
		type: "STRING",
		required: true,
	}, ],
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

			let storedSettings = await GuildSettings.findOne({
				GuildID: interaction.guild.id
			});
			if (!storedSettings) {
				const newSettings = new GuildSettings({
					GuildID: interaction.guild.id,
				});
				await newSettings.save().catch((e) => {
					client.logger.log(e, "error");
				});
				storedSettings = await GuildSettings.findOne({
					GuildID: interaction.guild.id
				});
			}

			storedSettings.Prefix = caracter[0];
			await storedSettings.save().catch((e) => {
				client.logger.log(e, "error");
			});

			interaction.reply({
				embeds: [new MessageEmbed()
					.setTitle("Prefix Changed")
					.setDescription(`Prefix changed to : \`${caracter[0]}\``)
					.setColor("RANDOM")
					.setFooter({
						text: `Custom Prefix Was Not So Hard To Make`
					})
				]
			})
			client.logger.log(`Client Prefix is now = "${caracter[0]}"`, "log")

		} catch (error) {
			interaction.reply("Some Error Occured");
			client.logger.log(error, "error")
		}

	}
}