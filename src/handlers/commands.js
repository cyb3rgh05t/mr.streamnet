module.exports = async (client, PG) => {

    let count = 0;
    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/*/*.js`)).map(async (file) => {
        const cmd = require(file);
        count++;
        if (cmd.name) {
            client.prefixcmd.set(cmd.name, cmd);
        }
    });
    client.logger.log(`Client Commands Loaded: ${count}`, "prefix")
}