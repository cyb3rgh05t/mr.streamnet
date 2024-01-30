const { Client } = require("discord.js");
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client, PG) => {

    let count = 0;
    (await PG(`${process.cwd().replace(/\\/g, "/")}/modals/*/*.js`)).map(async (file) => {
        const modalFile = require(file);
        count++;
        if (!modalFile.id)
        return client.logger.log(`FAILED missing a Modal ID`, "error");

        client.modals.set(modalFile.id, modalFile);
    });
    client.logger.log(`Client Modals Loaded: ${count}`, "modals")
}