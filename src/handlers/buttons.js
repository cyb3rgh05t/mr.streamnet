const colors = require("colors");

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Buttons Handler");
    const buttonsFolder = await PG(`${(process.cwd().replace(/\\/g, "/"))}/buttons/*/*.js`);

    buttonsFolder.map(async (file) => {
        const buttonFile = require(file);
        if (buttonFile.length <= 0) return console.log("[WARNING] No BUTTONS Found".yellow.bold);
        if(!buttonFile.id)
        return Table.addRow(file.split("/")[7], "🟥 FAILED", "missing a button id.");

        client.buttons.set(buttonFile.id, buttonFile);
        Table.addRow(buttonFile.id, "🟩 LOADED");
    });
    console.log(Table.toString());
}