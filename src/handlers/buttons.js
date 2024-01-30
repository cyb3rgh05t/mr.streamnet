module.exports = async (client, PG) => {

    let count = 0;
    const buttonsFolder = await PG(`${(process.cwd().replace(/\\/g, "/"))}/buttons/*/*.js`);

    buttonsFolder.map(async (file) => {
        const buttonFile = require(file);
        count++;
        if (!buttonFile.id)
        return client.logger.log(`FAILED missing a Button ID`, "error");

        client.buttons.set(buttonFile.id, buttonFile);

    });
    client.logger.log(`Client Buttons Loaded: ${count}`, "buttons")
}