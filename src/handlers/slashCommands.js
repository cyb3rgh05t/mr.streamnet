const { Perms } = require("../validation/permissions");
const { Client, ClientUser } = require("discord.js");
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client, PG) => {

  CommandsArray = [];
  let count = 0;

  (await PG(`${(process.cwd().replace(/\\/g, "/"))}/slashCommands/*/*.js`)).map(async (file) => {
    const command = require(file);
    count++;
    if (!command.name)
      client.logger.log(`${file.split("/")[7]} >>>>> FAILED missing a name`, "error")

    if (!command.type && !command.description)
      client.logger.log(`${command.name} >>>>> FAILED missing a description.`, "error")

    if (command.permission) {
      if (Perms.includes(command.permission))
        command.defaultPermission = false;
      else
        client.logger.log(`${command.name} >>>>> FAILED Permission is invalid.`, "error")
    }

    client.commands.set(command.name, command);
    CommandsArray.push(command);
  });

  client.logger.log(`Client SlashCommands Command (/) Loaded: ${count}`, "cmd");

  client.on('ready', async () => {
    const mainGuild = await client.guilds.cache.get(client.config.guildId);
    mainGuild.commands.set(CommandsArray);
  });
}