const colors = require("colors");

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Prefix Command Handler");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/prefixCommands/*/*.js`)).map(async (file) => {
        const cmd = require(file);

        if (cmd.name) {
            client.prefixcmd.set(cmd.name, cmd);
        }
        //await Table.addRow(cmd.name, "🟩 LOADED")
        client.logger.log(`LOADED PrefixCommand ${cmd.name.toUpperCase()} from ${file.split("/").pop()}`, "prefix")

    });
    //console.log(Table.toString());

}