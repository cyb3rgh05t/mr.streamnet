const colors = require("colors");

module.exports = async (client, PG, Ascii) => {

    const buttonsFolder = await PG(`${(process.cwd().replace(/\\/g, "/"))}/buttons/*/*.js`);

    buttonsFolder.map(async (file) => {
        const buttonFile = require(file);
        if(!buttonFile.id)
        return client.logger.log(`FAILED missing a Button ID`, "error");

        client.buttons.set(buttonFile.id, buttonFile);

        client.logger.log(`LOADED Button ${buttonFile.id.toUpperCase()} from ${file.split("/").pop()}`, "modals")
    
    });
    
}