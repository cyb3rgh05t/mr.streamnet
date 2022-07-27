const mongoose = require("mongoose")

const warnings = new mongoose.Schema({
            userId: String,
            guildId: String,
            moderatorId: String,
            reason: String,
        });

module.exports = mongoose.model("warnings", warnings)