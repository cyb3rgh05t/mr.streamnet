const colors = require("colors");

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Prefix Command Handler");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/prefixCommands/*/*.js`)).map(async (file) => {       
        const cmd = require(file);
       
        if (cmd.length <= 0) return console.log("[WARNING] No PREFIXCOMMANDS Found".yellow.bold);
        if(cmd.name){
            client.prefixcmd.set(cmd.name, cmd);
        }
        await Table.addRow(cmd.name, "🟩 LOADED")
        
    });
    console.log(Table.toString());
    
}