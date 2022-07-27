const mongoose = require("mongoose");

const tickets = new mongoose.Schema({
    GuildID: String,
    MembersID: [String],
    TicketID: String,
    ChannelID: String,
    Closed: Boolean,
    Locked: Boolean,
    Type: String,
    Claimed: Boolean,
    ClaimedBy: String,
    CreatedBy: String,
    Opened: String,
    });

    module.exports = mongoose.model("Tickets", tickets);