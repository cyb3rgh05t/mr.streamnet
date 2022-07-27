const mongoose = require("mongoose");

const CustomEmbedSchema = new mongoose.Schema({
    userId: String,
    messageId: String,
    finalChannel: String
});

const CustomEmbedModel = mongoose.model("CustomEmbedDB", CustomEmbedSchema);

module.exports = CustomEmbedModel;