const { Client, Message, MessageAttachment } = require("discord.js");
const path = require('path');

module.exports = {
  name: "storepic",
  description: "appstore channel logo",
  category: "logos",
  syntax: "command",
  permission: "ADMINISTRATOR",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      // Define the paths to the images
      const imagePaths = [
        path.resolve(__dirname, '../../src/images/app1.png'),
        path.resolve(__dirname, '../../src/images/app2.png'),
        path.resolve(__dirname, '../../src/images/app3.png')
      ];

      // Create an array of MessageAttachments
      const files = imagePaths.map(imagePath => new MessageAttachment(imagePath));

      await message.channel.send({
        files: files
      });
    } catch (error) {
      message.channel.send("Some Error Occurred");
      client.logger.error(error);
    }
  }
};