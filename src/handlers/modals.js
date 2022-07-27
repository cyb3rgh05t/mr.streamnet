const { Client } = require("discord.js");
const colors = require("colors");

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client, PG, Ascii) => {

    const Table = new Ascii("Modals Handler");
    
    (await PG(`${process.cwd().replace(/\\/g, "/")}/modals/*/*.js`)).map(async (file) => {
        const modalFile = require(file);
        if (modalFile.length <= 0) return console.log("[WARNING] No MODALS Found".yellow.bold);
    
        if(!modalFile.id) return;

        
        client.modals.set(modalFile.id, modalFile);
        await Table.addRow(`${modalFile.id}`, "🟩 LOADED");
        
    });
    console.log(Table.toString());
}