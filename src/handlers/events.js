const { Events } = require("../validation/eventNames");
const colors = require("colors");

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Events Handler");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/events/*/*.js`)).map(async (file) => {
        const event = require(file);
        if (event.length <= 0) return console.log("[WARNING] No EVENTS Found".yellow.bold);
        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, `🟥 Event name is either invalid or missing: ${L[6] + `/` + L[7]}`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "🟩 LOADED")
    });

    console.log(Table.toString());
}