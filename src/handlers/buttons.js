const colors = require("colors");

module.exports = async (client, PG, Ascii) => {

    const buttonsFolder = await PG(`${(process.cwd().replace(/\\/g, "/"))}/buttons/*/*.js`);

    buttonsFolder.map(async (file) => {
        const buttonFile = require(file);
        if(!buttonFile.id)
        return client.logger.log(`FAILED missing a button id`, "error");

        client.buttons.set(buttonFile.id, buttonFile);

        client.logger.log(`Loading button ${buttonFile.id.green.bold}`, "buttons");
    
    });
    
}