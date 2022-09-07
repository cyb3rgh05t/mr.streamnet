const {
    glob
} = require("glob");
const {
    builtinModules
} = require("module");
const {
    promisify
} = require("util");
const proGlob = promisify(glob);

async function loadEventFiles(dirName) {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/events/**/*.js`);
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}

module.exports = {
    loadEventFiles
}