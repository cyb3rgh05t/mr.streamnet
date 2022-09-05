const { Events } = require("../validation/eventNames");

module.exports = async (client, PG) => {

    let count = 0;
    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/events/*/*.js`)).map(async (file) => {
        const event = require(file);
        count++;
        if (!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await client.logger.log(`${event.name || "MISSING"} Event name is either invalid or missing`, "error");
            return;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };
    });
    client.logger.log(`Client Events Loaded: ${count}`, "event")
}