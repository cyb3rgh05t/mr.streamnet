const {
    Perms
} = require("../validation/permissions");

module.exports = async (client, PG) => {

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/*/*.js`)).map(async (file) => {
        const cmd = require(file);

        if (cmd.permission) {
            if (Perms.includes(cmd.permission))
                cmd.defaultPermission = false;
            else
                client.logger.log(`${cmd.name} 🟥 FAILED Permission is invalid.`, "error")
        }

        if (cmd.name) {
            client.prefixcmd.set(cmd.name, cmd);
        }
        client.logger.log(`LOADED Command ${cmd.name.toUpperCase()} from ${file.split("/").pop()}`, "prefix")

    });
}