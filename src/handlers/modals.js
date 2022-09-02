<<<<<<< Updated upstream
const { Client } = require("discord.js");
const colors = require("colors");

=======
const {
    Client
} = require("discord.js");
>>>>>>> Stashed changes
/**
 * 
 * @param {Client} client 
 */
<<<<<<< Updated upstream

module.exports = async (client, PG, Ascii) => {

    const Table = new Ascii("Modals Handler");
    
=======
module.exports = async (client, PG) => {

>>>>>>> Stashed changes
    (await PG(`${process.cwd().replace(/\\/g, "/")}/modals/*/*.js`)).map(async (file) => {
        const modalFile = require(file);
        if (modalFile.length <= 0) return console.log("[WARNING] No MODALS Found".yellow.bold);
    
        if(!modalFile.id) return;

        
        client.modals.set(modalFile.id, modalFile);
<<<<<<< Updated upstream
        await Table.addRow(`${modalFile.id}`, "🟩 LOADED");
        
    });
    console.log(Table.toString());
=======
        client.logger.log(`LOADED Modal ${modalFile.id.toUpperCase()} from ${file.split("/").pop()}`, "modals")

    });
>>>>>>> Stashed changes
}