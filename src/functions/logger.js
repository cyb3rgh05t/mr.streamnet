const moment = require("moment");
const chalk = require("chalk");

module.exports = class Logger {
	static log(content, type = "log") {
		const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
		switch (type) {

			case "log": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgMagentaBright(type.toUpperCase())}] | ${chalk.magentaBright(content)}`);
			}
			case "warn": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgYellow(type.toUpperCase())}] | ${chalk.yellow(content)}`);
			}
			case "error": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgRed(type.toUpperCase())}] | ${chalk.red(content)}`);
			}
			case "debug": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgBlue(type.toUpperCase())}] | ${chalk.blue(content)}`);
			}
			case "cmd": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgGreen(type.toUpperCase())}] | ${chalk.green(content)}`);
			}
			case "event": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgGreen(type.toUpperCase())}] | ${chalk.green(content)}`);
			}
			case "buttons": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgGreen(type.toUpperCase())}] | ${chalk.green(content)}`);
			}
			case "prefix": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgGreen(type.toUpperCase())}] | ${chalk.green(content)}`);
			}
			case "modals": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgGreen(type.toUpperCase())}] | ${chalk.green(content)}`);
			}
			case "ready": {
				return console.log(`[${chalk.gray(date)}]: [${chalk.bgGreen(type.toUpperCase())}] | ${chalk.green(content)}`);
			}
			default:
				throw new TypeError("Logger type must be either warn, debug, log, ready, cmd, buttons, modals or error.");
		}
	}
};