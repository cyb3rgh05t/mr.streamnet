const { ModalSubmitInteraction, Client } = require("discord.js");
const { Permissions } = require("../../src/validation/permissions");

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        if(!interaction.isModalSubmit()) return;

        
        const i = interaction;
        const modal = client.modals.get(interaction.customId);
        
        if(modal == undefined) return;

        modal.execute(interaction, client);
    
    }
}