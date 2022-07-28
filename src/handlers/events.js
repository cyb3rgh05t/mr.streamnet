const { Events } = require("../validation/eventNames");
const colors = require("colors");

module.exports = async (client, PG) => {

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/events/*/*.js`)).map(async (file) => {
        const event = require(file);
        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await client.logger.log(`${event.name || "MISSING"} Event name is either invalid or missing`, "error");
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };
        const L = file.split("/");
        client.logger.log(`Loading Events ${L[8].green.bold}`, "event");
    });

}