const {
  Perms
} = require("../validation/permissions");
const {
  Client,
  ClientUser
} = require("discord.js");
const {
  guildId
} = require("../config/config.json");
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client, PG) => {

  CommandsArray = [];

  (await PG(`${(process.cwd().replace(/\\/g, "/"))}/slashCommands/*/*.js`)).map(async (file) => {
    const command = require(file);

    if (!command.name)
      client.logger.log(`${file.split("/")[7]} 🟥 FAILED missing a name`, "error")

    if (!command.type && !command.description)
      client.logger.log(`${command.name} 🟥 FAILED missing a description.`, "error")

    if (command.permission) {
      if (Perms.includes(command.permission))
        command.defaultPermission = false;
      else
        client.logger.log(`${command.name} 🟥 FAILED Permission is invalid.`, "error")
    }

    client.commands.set(command.name, command);
    CommandsArray.push(command);
    client.logger.log(`LOADED SlashCommand ${command.name.toUpperCase()} from ${file.split("/").pop()}`, "cmd")

  });

  client.on('ready', async () => {
    const mainGuild = await client.guilds.cache.get(guildId);
    mainGuild.commands.set(CommandsArray);
  });
}
