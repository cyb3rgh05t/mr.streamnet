const {
    Client
} = require("discord.js");
/**
 * 
 * @param {Client} client 
 */

module.exports = async (client, PG) => {

    //const Table = new Ascii("Modals Handler");

    (await PG(`${process.cwd().replace(/\\/g, "/")}/modals/*/*.js`)).map(async (file) => {
        const modalFile = require(file);

        if (!modalFile.id) return;


        client.modals.set(modalFile.id, modalFile);
        client.logger.log(`LOADED Modal ${modalFile.id.toUpperCase()} from ${file.split("/").pop()}`, "modals")
    });
}