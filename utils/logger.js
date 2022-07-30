const chalk = require("chalk");
const moment = require("moment");
const colors = require("colors/safe");

module.exports = class Logger {
	static log (content, type = "log") {
		const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
		switch (type) {
	
		case "log": {
			return console.log(`[${colors.gray(date)}]: [${colors.magenta(type.toUpperCase())}] ${content}`);
		}
		case "warn": {
			return console.log(`[${colors.gray(date)}]: [${colors.yellow(type.toUpperCase())}] ${content}`);
		}
		case "error": {
			return console.log(`[${colors.gray(date)}]: [${colors.red(type.toUpperCase())}] ${content}`);
		}
		case "debug": {
			return console.log(`[${colors.gray(date)}]: [${colors.blue(type.toUpperCase())}] ${content}`);
		}
		case "cmd": {
			return console.log(`[${colors.gray(date)}]: [${colors.green(type.toUpperCase())}] ${content}`);
		}
		case "event": {
			return console.log(`[${colors.gray(date)}]: [${colors.green(type.toUpperCase())}] ${content}`);
		}
		case "buttons": {
			return console.log(`[${colors.gray(date)}]: [${colors.green(type.toUpperCase())}] ${content}`);
		}
		case "prefix": {
			return console.log(`[${colors.gray(date)}]: [${colors.green(type.toUpperCase())}] ${content}`);
		}
		case "modals": {
			return console.log(`[${colors.gray(date)}]: [${colors.green(type.toUpperCase())}] ${content}`);
		}
		case "ready": {
			return console.log(`[${colors.gray(date)}]: [${colors.green(type.toUpperCase())}] ${content}`);
		} 
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd, buttons, modals or error.");
		}
	}
};