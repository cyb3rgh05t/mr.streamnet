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
const colors = require("colors");

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client, PG, Ascii) => {
  //const Table = new Ascii("Commands Handler");

  CommandsArray = [];

  (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/*/*.js`)).map(async (file) => {
    const command = require(file);

    if (!command.name)
      client.logger.log(`${file.split("/")[7]} 🟥 FAILED missing a name`, "error")
    //return Table.addRow(file.split("/")[7], "🟥 FAILED", "missing a name.")


    if (!command.type && !command.description)
      client.logger.log(`${command.name} 🟥 FAILED missing a description.`, "error")
    //return Table.addRow(command.name, "🟥 FAILED", "missing a description.")

    if (command.permission) {
      if (Perms.includes(command.permission))
        command.defaultPermission = false;
      else
        client.logger.log(`${command.name} 🟥 FAILED Permission is invalid.`, "error")
      //return Table.addRow(command.name, "🟥 FAILED", "Permission is invalid.")
    }

    client.commands.set(command.name, command);
    CommandsArray.push(command);
    client.logger.log(`LOADED Command ${command.name.toUpperCase()} from ${file.split("/").pop()}`, "cmd")
    //await Table.addRow(command.name,"🟩 LOADED");

  });

  //console.log(Table.toString());



  // PERMISSION CHECK //

  client.on('ready', async () => {
    const mainGuild = await client.guilds.cache.get(guildId);
    mainGuild.commands.set(CommandsArray);
  });
}