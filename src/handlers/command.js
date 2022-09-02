module.exports = async (client, PG) => {

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/*/*.js`)).map(async (file) => {
        const cmd = require(file);

        if (cmd.name) {
            client.prefixcmd.set(cmd.name, cmd);
        }
        client.logger.log(`LOADED Command ${cmd.name.toUpperCase()} from ${file.split("/").pop()}`, "prefix")
    });
}