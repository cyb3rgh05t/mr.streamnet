const mongoose = require('mongoose');

const ticketsetup = new mongoose.Schema({
    GuildID: String,
    Channel: String,
    Category: String,
    Transcripts: String,
    Handlers: String,
    Everyone: String,
    Description: String,
    Buttons: [String],
});

module.exports = mongoose.model("TicketSetup", ticketsetup);